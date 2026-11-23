import { describe, expect, it } from 'vitest';
import {
  DEMO_CAPABILITY_RECORDS,
  DEMO_DATA_NOTICE,
  DEMO_MACHINERY_RECORDS,
} from './demoData';

describe('fictional demo data', () => {
  it('identifies the locally bundled sample data as fictional in both languages', () => {
    expect(DEMO_DATA_NOTICE.title.en).toMatch(/fictional/i);
    expect(DEMO_DATA_NOTICE.title.af).toMatch(/fiktiewe/i);
    expect(DEMO_DATA_NOTICE.description.en).toMatch(/not connected to a live/i);
    expect(DEMO_DATA_NOTICE.description.af).toMatch(/nie aan ’n regstreekse/i);

    expect(DEMO_MACHINERY_RECORDS.length).toBeGreaterThan(0);
    expect(DEMO_CAPABILITY_RECORDS.length).toBeGreaterThan(0);
    expect(
      DEMO_MACHINERY_RECORDS.every(
        (record) => record.dataClassification === 'fictional',
      ),
    ).toBe(true);
    expect(
      DEMO_CAPABILITY_RECORDS.every(
        (record) =>
          record.dataClassification === 'fictional' &&
          record.availability === 'potential',
      ),
    ).toBe(true);
  });

  it('provides unique record identifiers and localized copy', () => {
    const records = [...DEMO_MACHINERY_RECORDS, ...DEMO_CAPABILITY_RECORDS];
    const ids = records.map((record) => record.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(DEMO_CAPABILITY_RECORDS.map((record) => record.id)).toEqual([
      'machinery-register',
      'maintenance-records',
      'tools-and-equipment-stock',
      'detailing-records',
      'reports',
      'document-storage',
    ]);

    for (const record of records) {
      const localizedTitle = 'name' in record ? record.name : record.title;

      expect(localizedTitle.en).toBeTruthy();
      expect(localizedTitle.af).toBeTruthy();
      if ('description' in record) {
        expect(record.description.en).toBeTruthy();
        expect(record.description.af).toBeTruthy();
      }
    }
  });
});
