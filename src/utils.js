import moment from 'moment'
import { DATE_FORMATS } from './constants'

export function csvToJSON(text) {
    if (!text) return [];

    const allRows = text
        .split("\n")
        .map(row => row.trim())
        .filter(Boolean);

    if (allRows.length < 2) return [];

    const headers = allRows[0]
        .split(",")
        .map(header => header.trim());

    const valueRows = allRows.slice(1);

    return valueRows.map(row => {
        const obj = {};
        const values = row.split(",").map(value => value.trim());
        headers.forEach((header, i) => {
            obj[header] = values[i] === "NULL" ? null : values[i];
        });
        return obj;
    });
}

export function getEmployeeOverlapRows(data) {
    if (!data || data.length === 0) return [];

    const { pairTotals, pairProjects } = accumulatePairs(data);
    const maxPair = findMaxPair(pairTotals);

    if (!maxPair) return [];

    const maxPairProjects = pairProjects[maxPair];
    const [emp1, emp2] = maxPair.split('-');

    const rows = maxPairProjects.map((item, index) => ({
        id: `${emp1}-${emp2}-${item.projectId}-${index}`,
        emp1,
        emp2,
        projectId: item.projectId,
        days: item.days
    }))

    return rows;
}

function accumulatePairs(data) {
    const pairTotals = {};
    const pairProjects = {};

    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const emp1 = data[i];
            const emp2 = data[j];

            const daysWorked = calculateOverlap(emp1, emp2);
            if (daysWorked === 0) continue;

            const key = generatePairKey(emp1, emp2);
            pairTotals[key] = (pairTotals[key] || 0) + daysWorked;
            pairProjects[key] = pairProjects[key] || [];
            pairProjects[key].push({ projectId: emp1.ProjectID, days: daysWorked });
        }
    }

    return { pairTotals, pairProjects };
}


function findMaxPair(pairTotals) {
    let maxPair = null;
    let maxDays = 0;

    for (const pair in pairTotals) {
        if (pairTotals[pair] > maxDays) {
            maxDays = pairTotals[pair];
            maxPair = pair;
        }
    }

    return maxPair;
}

function calculateOverlap(emp1, emp2) {
    if (emp1.ProjectID !== emp2.ProjectID) return 0;

    const start1 = parseDate(emp1.DateFrom);
    const start2 = parseDate(emp2.DateFrom);

    if (!start1 || !start2) return 0;

    const end1 = parseDate(emp1.DateTo, true);
    const end2 = parseDate(emp2.DateTo, true);

    const start = moment.max(start1, start2);
    const end = moment.min(end1, end2);

    const days = end.diff(start, 'days') + 1;
    return days > 0 ? days : 0;
}

function parseDate(date, isEnd = false) {
    if (!date || date === "NULL") return isEnd ? moment() : null;
    return moment(date, DATE_FORMATS);
}

function generatePairKey(emp1, emp2) {
    return emp1.EmpID < emp2.EmpID
        ? `${emp1.EmpID}-${emp2.EmpID}`
        : `${emp2.EmpID}-${emp1.EmpID}`;
}
