import { generatePluginTableList } from "../generatePluginTableList";

const flatTables = require('./data/flatTables.json');
const selectorTables = require('./data/flatTables.json');

describe('generatePluginTableList', () => {
    const selectorTableMap = selectorTables.reduce((acc: any, next: any) => {
        return {
            ...acc,
            [next.name]: next
        };
    }, {});

    it('should convert flat list of plugin tables to a format for TableSelector', () => {
        const result = generatePluginTableList(flatTables);

        result.forEach(res => expect(res).toMatchObject(selectorTableMap[res.name]));
    });
});
