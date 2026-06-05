import { parseFullName } from './parseFullName.js';

describe('parseFullName', () => {
  it('should return an empty first name and null last name when the full name is blank', () => {
    expect(parseFullName('   ')).toEqual({ firstName: '', lastName: null });
  });

  it('should return the full name as the first name when there is no separator', () => {
    expect(parseFullName('Prince')).toEqual({ firstName: 'Prince', lastName: null });
  });

  it('should split a full name on the first space', () => {
    expect(parseFullName('Anna Marie Jones')).toEqual({ firstName: 'Anna', lastName: 'Marie Jones' });
  });

  it('should trim and normalize whitespace before splitting', () => {
    expect(parseFullName('  Anna   Marie   Jones  ')).toEqual({ firstName: 'Anna', lastName: 'Marie Jones' });
  });

  it('should parse comma-separated names as last name then first name', () => {
    expect(parseFullName('Jones, Anna Marie')).toEqual({ firstName: 'Anna Marie', lastName: 'Jones' });
  });

  it('should trim comma-separated name parts', () => {
    expect(parseFullName('  Jones  ,  Anna Marie  ')).toEqual({ firstName: 'Anna Marie', lastName: 'Jones' });
  });

  it('should use the last-name portion as the first name when the comma is followed by a blank value', () => {
    expect(parseFullName('Jones,   ')).toEqual({ firstName: 'Jones', lastName: null });
  });

  it('should use the first-name portion as the first name when the comma is preceded by a blank value', () => {
    expect(parseFullName(', Anna')).toEqual({ firstName: 'Anna', lastName: null });
  });
});
