import { getEnabledTablesObject } from '../getEnabledTablesObject';

describe('getEnabledTablesObject', () => {
  it('should generate an empty object given no inputs', () => {
    // Test case 1: pluginName with spaces
    expect(getEnabledTablesObject({})).toMatchObject({});
  });

  it('should enable all tables if tablesList is only 1 record', () => {
    // Test case 1: pluginName with spaces
    expect(
      getEnabledTablesObject({
        tablesList: [
          {
            name: 'abc',
            title: 'ABC',
            is_incremental: false,
            description: 'abc',
            relations: [],
          },
        ],
        tables: [],
      }),
    ).toMatchObject({ abc: true });
  });

  it('should all tables if tables === *', () => {
    // Test case 1: pluginName with spaces
    expect(
      getEnabledTablesObject({
        tablesList: [
          {
            name: 'abc',
            title: 'ABC',
            is_incremental: false,
            description: 'abc',
            relations: [],
          },
          {
            name: 'def',
            title: 'DEF',
            is_incremental: false,
            description: 'def',
            relations: [],
          },
        ],
        tables: ['*'],
      }),
    ).toMatchObject({ abc: true, def: true });
  });
});
