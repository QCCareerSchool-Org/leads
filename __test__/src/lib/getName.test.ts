import { getName } from '../../../src/lib/getName.ts';

describe('getName', () => {

  it('should return the first name and last name unchanged if both are specified', () => {
    const submittedFirstName = 'Joe';
    const submittedLastName = 'Smith';

    const [ firstName, lastName ] = getName(submittedFirstName, submittedLastName);

    expect(firstName).toBe(submittedFirstName);
    expect(lastName).toBe(submittedLastName);
  });

  // testing first name empty or undefined for each of last name being specified, empty, and undefined
  [ 'Smith', '', undefined ].forEach(submittedLastName => {
    describe(`when the last name is ${typeof submittedLastName === 'undefined' ? 'undefined' : `"${submittedLastName}"`}`, () => {

      it('should return the first name and last name unchanged when the first name is empty', () => {
        const submittedFirstName = '';
        const [ firstName, lastName ] = getName(submittedFirstName, submittedLastName);
        expect(firstName).toBe(submittedFirstName);
        expect(lastName).toBe(submittedLastName);
      });

      it('should return the first name and last name unchanged when the first name is undefined', () => {
        const submittedFirstName = undefined;
        const [ firstName, lastName ] = getName(submittedFirstName, submittedLastName);
        expect(firstName).toBe(submittedFirstName);
        expect(lastName).toBe(submittedLastName);
      });
    });
  });

  // for each of last name being empty or undefined
  [ '', undefined ].forEach(submittedLastName => {
    describe(`when the last name is ${typeof submittedLastName === 'undefined' ? 'undefined' : `"${submittedLastName}"`}`, () => {

      it('should return the first name and last name unchanged when the first name has no spaces', () => {
        const submittedFirstName = 'Joe';
        const [ firstName, lastName ] = getName(submittedFirstName, submittedLastName);
        expect(firstName).toBe(submittedFirstName);
        expect(lastName).toBe(submittedLastName);
      });

      it('should return the first part of the first name and the rest of the first name separately when the first name has a space', () => {
        const submittedFirstName = 'Anna Marie Jones';
        const [ firstName, lastName ] = getName(submittedFirstName, submittedLastName);
        expect(firstName).toBe('Anna');
        expect(lastName).toBe('Marie Jones');
      });
    });
  });
});
