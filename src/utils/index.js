const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
const DATE_NOW_PLACEHOLDER = 'NULL';

export const fileToJSON = (content) => {
  let rows = content.split(/\r?\n/);
  let rowsJSON = rows.map((value) => {
    let fields = value.split(',').map((item) => item.trim());;
    return {
      id: fields[0],
      project_id: fields[1],
      dates: {
        start: fields[2],
        end: fields[3]
      }
    }
  })

  return rowsJSON;
};

export const getMaxOverlapProjects = (employees) => {
  let pairsTable = getPairsTable(employees);

  let sortedPairs = pairsTable.sort(function (a, b) {
    return b.totalDays - a.totalDays;
  });

  return sortedPairs[0];
}

const getPairsTable = (data) => {
  let pairTable = [];

  for (let i = 0; i < data.length; i++) {
    const employeeLeft = data[i];
    for (let j = i + 1; j < data.length; j++) {
      const employeeRight = data[j];

      if (employeeLeft.id !== employeeRight.id && employeeLeft.project_id === employeeRight.project_id) {
        let pairID = employeeLeft.id + ':' + employeeRight.id;

        let daysOverlap = getOverlappingDaysInIntervals(employeeLeft.dates, employeeRight.dates);
        let pairProject = { project_id: employeeLeft.project_id, daysWorked: daysOverlap };

        if (!pairTable[pairID]) {
          pairTable[pairID] = {
            totalDays: daysOverlap,
            employee1_id: employeeLeft.id,
            employee2_id: employeeRight.id,
            projects: [pairProject]
          };
        } else {
          pairTable[pairID].totalDays += daysOverlap;
          pairTable[pairID].projects.push(pairProject);
        }
      }
    }
  }

  return Object.values(pairTable);
}

const getOverlappingDaysInIntervals = (intervalLeft, intervalRight) => {
  let timeIntervalLeft = { start: parseDate(intervalLeft.start).getTime(), end: parseDate(intervalLeft.end).getTime() };
  let timeIntervalRight = { start: parseDate(intervalRight.start).getTime(), end: parseDate(intervalRight.end).getTime() };

  let isOverlapping =
    timeIntervalLeft.start < timeIntervalRight.end &&
    timeIntervalRight.start < timeIntervalLeft.end;

  if (!isOverlapping) {
    return 0;
  }

  let overlapStart =
    timeIntervalRight.start < timeIntervalLeft.start ?
      timeIntervalLeft.start : timeIntervalRight.start;

  let overlapEnd =
    timeIntervalRight.end > timeIntervalLeft.end ?
      timeIntervalLeft.end : timeIntervalRight.end;

  let differenceInMs = overlapEnd - overlapStart;

  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY)
}

const parseDate = (dateString) => {
  if(dateString === DATE_NOW_PLACEHOLDER){
    return new Date();
  }

  let timestamp = Date.parse(dateString);

  if (!isNaN(timestamp)) {
    return new Date(timestamp);
  }

  throw new Error('Invalid Date Format');
}