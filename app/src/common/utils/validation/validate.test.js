import * as validate from './validate';

describe('validate.required', () => {
  test('validation should be correct', () => {
    expect(validate.required(' abc ')).toBe(true);
    expect(validate.required(123)).toBe(true);
    expect(validate.required(0)).toBe(true);
    expect(validate.required(false)).toBe(true);
  });
  test('validation should be not correct', () => {
    expect(validate.required('')).toBe(false);
    expect(validate.required('   ')).toBe(false);
    expect(validate.required(null)).toBe(false);
    expect(validate.required(undefined)).toBe(false);
  });
});

describe('validate.isNotEmptyArray', () => {
  test('validation should be correct', () => {
    expect(validate.isNotEmptyArray([1])).toBe(true);
  });
  test('validation should be not correct', () => {
    expect(validate.isNotEmptyArray(undefined)).toBe(false);
    expect(validate.isNotEmptyArray([])).toBe(false);
  });
});

describe('validate.url', () => {
  test('validation should be correct', () => {
    expect(validate.url('https://example.com/')).toBe(true);
    expect(validate.url('http://example.com/')).toBe(true);
  });
  test('validation should be not correct', () => {
    expect(validate.url(undefined)).toBe(false);
    expect(validate.url('   ')).toBe(false);
    expect(validate.url('example/example')).toBe(false);
    expect(validate.url('http:/example.com/')).toBe(false);
  });
});

describe('validate.email', () => {
  test('validation should be correct', () => {
    expect(validate.email('email@example.com')).toBe(true);
    expect(validate.email('firstname.lastname@example.com')).toBe(true);
    expect(validate.email('email@subdomain.example.com')).toBe(true);
    expect(validate.email('firstname+lastname@example.com')).toBe(true);
    expect(validate.email('email@123.123.123.123')).toBe(true);
    expect(validate.email('1234567890@example.com')).toBe(true);
    expect(validate.email('firstname-lastname@example.com')).toBe(true);
    expect(validate.email('email@example.co.jp')).toBe(true);
  });
  test('validation should be not correct', () => {
    expect(validate.email('plainaddress')).toBe(false);
    expect(validate.email('#@%^%#$@#$@#.com')).toBe(false);
    expect(validate.email('@example.com')).toBe(false);
    expect(validate.email('Joe Smith <email@example.com>')).toBe(false);
    expect(validate.email('email.example.com')).toBe(false);
    expect(validate.email('email@example@example.com')).toBe(false);
    expect(validate.email('email@example.com (Joe Smith)')).toBe(false);
    expect(validate.email('email@example')).toBe(false);
    expect(validate.email('あいうえお@example.com')).toBe(false);
  });
});

describe('validate.requiredEmail', () => {
  test('validation should be correct', () => {
    expect(validate.email('email@example.com')).toBe(true);
  });
  test('validation should be not correct', () => {
    expect(validate.email('   ')).toBe(false);
    expect(validate.email(null)).toBe(false);
    expect(validate.email('@example.com')).toBe(false);
  });
});

describe('validate.login', () => {
  test('validation should be correct', () => {
    expect(validate.login('login')).toBe(true);
    expect(validate.login('login-test_123.foo')).toBe(true);
  });
  test('validation should not be correct', () => {
    expect(validate.login(undefined)).toBe(false);
    expect(validate.login('')).toBe(false);
    expect(validate.login('  ')).toBe(false);
    expect(validate.login('login^test')).toBe(false);
    expect(validate.login('логин')).toBe(false);
  });
});

describe('validate.password', () => {
  test('validation should be correct', () => {
    expect(validate.password('1234')).toBe(true);
    expect(validate.password('1234567890123456789012345')).toBe(true);
    expect(validate.password('Aa1@3@.?n&()*^HFU')).toBe(true);
    expect(validate.password('firstname+lastname@ex')).toBe(true);
  });
  test('validation should be not correct', () => {
    expect(validate.password(undefined)).toBe(false);
    expect(validate.password('123')).toBe(false);
  });
});

describe('validate.userName', () => {
  test('validation should be correct', () => {
    expect(validate.userName('abc')).toBe(true);
    expect(validate.userName('full name')).toBe(true);
    expect(validate.userName('полное имя')).toBe(true);
    expect(validate.userName('full name with.some_symbols-123')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.userName(undefined)).toBe(false);
    expect(validate.userName('')).toBe(false);
    expect(validate.userName('  ')).toBe(false);
    expect(validate.userName('name#')).toBe(false);
    expect(validate.userName('Hello 世界')).toBe(false);
  });
});

describe('validate.filterName', () => {
  test('validation should be correct', () => {
    expect(validate.filterName('abc')).toBe(true);
    expect(validate.filterName('filter name')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.filterName(undefined)).toBe(false);
    expect(validate.filterName('')).toBe(false);
    expect(validate.filterName('  ')).toBe(false);
    expect(validate.filterName('f')).toBe(false);
    const textLonger128 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.filterName(textLonger128)).toBe(false);
  });
});

describe('validate.launchName', () => {
  test('validation should be correct', () => {
    expect(validate.launchName('a')).toBe(true);
    expect(validate.launchName('launch name')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.launchName(undefined)).toBe(false);
    expect(validate.launchName('')).toBe(false);
    expect(validate.launchName('  ')).toBe(false);
    const textLonger256 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.launchName(textLonger256)).toBe(false);
  });
});

describe('validate.dashboardName', () => {
  test('validation should be correct', () => {
    expect(validate.dashboardName('abc')).toBe(true);
    expect(validate.dashboardName('dashboard name')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.dashboardName(undefined)).toBe(false);
    expect(validate.dashboardName('')).toBe(false);
    expect(validate.dashboardName('  ')).toBe(false);
    expect(validate.dashboardName('ab')).toBe(false);
    const textLonger128 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.dashboardName(textLonger128)).toBe(false);
  });
});

describe('validate.dashboardNameUnique', () => {
  const dashboards = [
    {
      id: 1,
      name: 'abc',
    },
    {
      id: 2,
      name: 'old_name',
    },
    {
      id: 3,
      name: 'third',
    },
  ];
  const dashboardNameUniqueValidator = validate.dashboardNameUnique(dashboards, {
    id: 2,
    name: 'old_name',
  });
  test('validation should be correct', () => {
    expect(dashboardNameUniqueValidator('new_name')).toBe(true);
    expect(dashboardNameUniqueValidator('old_name')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(dashboardNameUniqueValidator('abc')).toBe(false);
  });
});

describe('validate.widgetName', () => {
  test('validation should be correct', () => {
    expect(validate.widgetName('abc')).toBe(true);
    expect(validate.widgetName('widgetName name')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.widgetName(undefined)).toBe(false);
    expect(validate.widgetName('')).toBe(false);
    expect(validate.widgetName('  ')).toBe(false);
    expect(validate.widgetName('ab')).toBe(false);
    const textLonger128 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.widgetName(textLonger128)).toBe(false);
  });
});

describe('validate.widgetNameUnique', () => {
  const widgets = [
    {
      widgetId: 1,
      widgetName: 'abc',
    },
    {
      widgetId: 2,
      widgetName: 'old_name',
    },
    {
      widgetId: 3,
      widgetName: 'third',
    },
  ];
  const widgetNameUniqueValidator = validate.widgetNameUnique(widgets, 2);
  test('validation should be correct', () => {
    expect(widgetNameUniqueValidator('new_name')).toBe(true);
    expect(widgetNameUniqueValidator('old_name')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(widgetNameUniqueValidator('abc')).toBe(false);
  });
});

describe('validate.issueId', () => {
  test('validation should be correct', () => {
    expect(validate.issueId('a')).toBe(true);
    expect(validate.issueId('issue id')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.issueId(undefined)).toBe(false);
    expect(validate.issueId('')).toBe(false);
    expect(validate.issueId('  ')).toBe(false);
    const textLonger128 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.issueId(textLonger128)).toBe(false);
  });
});

describe('validate.ldapUrl', () => {
  test('validation should be correct', () => {
    expect(validate.ldapUrl('ldap://example.com:8888')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.ldapUrl(undefined)).toBe(false);
    expect(validate.ldapUrl('')).toBe(false);
    expect(validate.ldapUrl('  ')).toBe(false);
    expect(validate.ldapUrl('example')).toBe(false);
  });
});

describe('validate.ldapSynchronizationAttributes', () => {
  test('validation should be correct', () => {
    expect(validate.ldapSynchronizationAttributes({ email: 'example' })).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.ldapSynchronizationAttributes(undefined)).toBe(false);
    expect(validate.ldapSynchronizationAttributes({})).toBe(false);
    expect(validate.ldapSynchronizationAttributes({ email: '' })).toBe(false);
  });
});

describe('validate.defectTypeLongName', () => {
  test('validation should be correct', () => {
    expect(validate.defectTypeLongName('abc')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.defectTypeLongName(undefined)).toBe(false);
    expect(validate.defectTypeLongName('')).toBe(false);
    expect(validate.defectTypeLongName('  ')).toBe(false);
    expect(validate.defectTypeLongName('ab')).toBe(false);
    const textLonger55 = 'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.defectTypeLongName(textLonger55)).toBe(false);
  });
});

describe('validate.defectTypeShortName', () => {
  test('validation should be correct', () => {
    expect(validate.defectTypeShortName('abc')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.defectTypeShortName(undefined)).toBe(false);
    expect(validate.defectTypeShortName('')).toBe(false);
    expect(validate.defectTypeShortName('  ')).toBe(false);
    expect(validate.defectTypeShortName('abcde')).toBe(false);
  });
});

describe('validate.projectName', () => {
  test('validation should be correct', () => {
    expect(validate.projectName('abc')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.projectName(undefined)).toBe(false);
    expect(validate.projectName('')).toBe(false);
    expect(validate.projectName('  ')).toBe(false);
    expect(validate.projectName('project test')).toBe(false);
    expect(validate.projectName('проект')).toBe(false);
    const textLonger256 =
      'this_is_very_long_text_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.projectName(textLonger256)).toBe(false);
  });
});

describe('validate.btsProject', () => {
  test('validation should be correct', () => {
    expect(validate.btsProject('abc')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.btsProject(undefined)).toBe(false);
    expect(validate.btsProject('')).toBe(false);
    expect(validate.btsProject('  ')).toBe(false);
    const textLonger55 = 'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.btsProject(textLonger55)).toBe(false);
  });
});

describe('validate.patternNameLength', () => {
  test('validation should be correct', () => {
    expect(validate.patternNameLength('abc')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.patternNameLength(undefined)).toBe(false);
    expect(validate.patternNameLength('')).toBe(false);
    expect(validate.patternNameLength('  ')).toBe(false);
    const textLonger55 = 'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.patternNameLength(textLonger55)).toBe(false);
  });
});

describe('validate.patternNameUnique', () => {
  const patterns = [
    {
      id: 1,
      name: 'abc',
    },
    {
      id: 2,
      name: 'old_name',
    },
    {
      id: 3,
      name: 'third',
    },
  ];
  const patternNameUniqueValidator = validate.patternNameUnique(2, patterns);
  test('validation should be correct', () => {
    expect(patternNameUniqueValidator('new_name')).toBe(true);
    expect(patternNameUniqueValidator('old_name')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(patternNameUniqueValidator('abc')).toBe(false);
  });
});

describe('validate.analyzerMinShouldMatch', () => {
  test('validation should be correct', () => {
    expect(validate.analyzerMinShouldMatch('50')).toBe(true);
    expect(validate.analyzerMinShouldMatch('100')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.analyzerMinShouldMatch(undefined)).toBe(false);
    expect(validate.analyzerMinShouldMatch('')).toBe(false);
    expect(validate.analyzerMinShouldMatch('  ')).toBe(false);
    expect(validate.analyzerMinShouldMatch('3')).toBe(false);
    expect(validate.analyzerMinShouldMatch('30')).toBe(false);
    expect(validate.analyzerMinShouldMatch('300')).toBe(false);
  });
});

describe('validate.analyzerMinTermFreq', () => {
  test('validation should be correct', () => {
    expect(validate.analyzerMinTermFreq('1')).toBe(true);
    expect(validate.analyzerMinTermFreq('10')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.analyzerMinTermFreq(undefined)).toBe(false);
    expect(validate.analyzerMinTermFreq('')).toBe(false);
    expect(validate.analyzerMinTermFreq('  ')).toBe(false);
    expect(validate.analyzerMinTermFreq('11')).toBe(false);
    expect(validate.analyzerMinTermFreq('0')).toBe(false);
  });
});

describe('validate.analyzerMinDocFreq', () => {
  test('validation should be correct', () => {
    expect(validate.analyzerMinDocFreq('1')).toBe(true);
    expect(validate.analyzerMinDocFreq('10')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.analyzerMinDocFreq(undefined)).toBe(false);
    expect(validate.analyzerMinDocFreq('')).toBe(false);
    expect(validate.analyzerMinDocFreq('  ')).toBe(false);
    expect(validate.analyzerMinDocFreq('11')).toBe(false);
    expect(validate.analyzerMinDocFreq('0')).toBe(false);
  });
});

describe('validate.analyzerMinDocFreq', () => {
  test('validation should be correct', () => {
    expect(validate.analyzerMinDocFreq('1')).toBe(true);
    expect(validate.analyzerMinDocFreq('10')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.analyzerMinDocFreq(undefined)).toBe(false);
    expect(validate.analyzerMinDocFreq('')).toBe(false);
    expect(validate.analyzerMinDocFreq('  ')).toBe(false);
    expect(validate.analyzerMinDocFreq('11')).toBe(false);
    expect(validate.analyzerMinDocFreq('0')).toBe(false);
  });
});

describe('validate.itemNameEntity', () => {
  test('validation should be correct', () => {
    expect(validate.itemNameEntity({ value: 'abc' })).toBe(true);
    expect(validate.itemNameEntity({ value: 'launch name' })).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.itemNameEntity(undefined)).toBe(false);
    expect(validate.itemNameEntity({})).toBe(false);
    expect(validate.itemNameEntity({ value: '' })).toBe(false);
    expect(validate.itemNameEntity({ value: '  ' })).toBe(false);
    expect(validate.itemNameEntity({ value: 'a' })).toBe(false);
    const textLonger256 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.itemNameEntity({ value: textLonger256 })).toBe(false);
  });
});

describe('validate.launchNumericEntity', () => {
  test('validation should be correct', () => {
    expect(validate.launchNumericEntity({ value: '1' })).toBe(true);
    expect(validate.launchNumericEntity({ value: '123456789012345678' })).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.launchNumericEntity(undefined)).toBe(false);
    expect(validate.launchNumericEntity({})).toBe(false);
    expect(validate.launchNumericEntity({ value: '' })).toBe(false);
    expect(validate.launchNumericEntity({ value: '  ' })).toBe(false);
    expect(validate.launchNumericEntity({ value: 'a' })).toBe(false);
    expect(validate.launchNumericEntity({ value: '1234567890123456789' })).toBe(false);
  });
});

describe('validate.descriptionEntity', () => {
  test('validation should be correct', () => {
    expect(validate.descriptionEntity({ value: 'abc' })).toBe(true);
    expect(validate.descriptionEntity({ value: 'example 18 symbols' })).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.launchNumericEntity(undefined)).toBe(false);
    expect(validate.launchNumericEntity({})).toBe(false);
    expect(validate.launchNumericEntity({ value: '' })).toBe(false);
    expect(validate.launchNumericEntity({ value: '  ' })).toBe(false);
    expect(validate.launchNumericEntity({ value: 'a' })).toBe(false);
    expect(validate.launchNumericEntity({ value: 'example more then 18 symbols' })).toBe(false);
  });
});

describe('validate.port', () => {
  test('validation should be correct', () => {
    expect(validate.port(1)).toBe(true);
    expect(validate.port(65535)).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.port(undefined)).toBe(false);
    expect(validate.port('')).toBe(false);
    expect(validate.port(0)).toBe(false);
    expect(validate.port(66666)).toBe(false);
  });
});

describe('validate.searchFilter', () => {
  test('validation should be correct', () => {
    expect(validate.searchFilter(undefined)).toBe(true);
    expect(validate.searchFilter('')).toBe(true);
    expect(validate.searchFilter('abc')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.searchFilter('    ')).toBe(false);
    expect(validate.searchFilter('a')).toBe(false);
  });
});

describe('validate.attributeKey', () => {
  test('validation should be correct', () => {
    expect(validate.attributeKey(undefined)).toBe(true);
    expect(validate.attributeKey('')).toBe(true);
    expect(validate.attributeKey('a')).toBe(true);
    expect(validate.attributeKey('attribute key')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.attributeKey('    ')).toBe(false);
    const textLonger128 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.attributeKey(textLonger128)).toBe(false);
  });
});

describe('validate.attributeValue', () => {
  test('validation should be correct', () => {
    expect(validate.attributeValue('a')).toBe(true);
    expect(validate.attributeValue('attribute value')).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.attributeValue(undefined)).toBe(false);
    expect(validate.attributeValue('')).toBe(false);
    expect(validate.attributeValue('    ')).toBe(false);
    const textLonger128 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.attributeValue(textLonger128)).toBe(false);
  });
});

describe('validate.attributesArray', () => {
  test('validation should be correct', () => {
    expect(validate.attributesArray([{ value: 'a' }])).toBe(true);
    expect(validate.attributesArray([{ key: 'a', value: 'abc' }])).toBe(true);
    expect(validate.attributesArray(undefined)).toBe(true);
    expect(validate.attributesArray([])).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.attributesArray([{ value: '' }])).toBe(false);
    expect(validate.attributesArray([{ value: 'a', edited: true }])).toBe(false);
  });
});

describe('validate.widgetNumberOfLaunches', () => {
  test('validation should be correct', () => {
    expect(validate.widgetNumberOfLaunches(1)).toBe(true);
    expect(validate.widgetNumberOfLaunches(600)).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.widgetNumberOfLaunches(undefined)).toBe(false);
    expect(validate.widgetNumberOfLaunches('')).toBe(false);
    expect(validate.widgetNumberOfLaunches(0)).toBe(false);
    expect(validate.widgetNumberOfLaunches(601)).toBe(false);
  });
});

describe('validate.cumulativeItemsValidation', () => {
  test('validation should be correct', () => {
    expect(validate.cumulativeItemsValidation(1)).toBe(true);
    expect(validate.cumulativeItemsValidation(15)).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.cumulativeItemsValidation(undefined)).toBe(false);
    expect(validate.cumulativeItemsValidation('')).toBe(false);
    expect(validate.cumulativeItemsValidation(0)).toBe(false);
    expect(validate.cumulativeItemsValidation(16)).toBe(false);
  });
});

describe('validate.flakyWidgetNumberOfLaunches', () => {
  test('validation should be correct', () => {
    expect(validate.flakyWidgetNumberOfLaunches(2)).toBe(true);
    expect(validate.flakyWidgetNumberOfLaunches(600)).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.flakyWidgetNumberOfLaunches(undefined)).toBe(false);
    expect(validate.flakyWidgetNumberOfLaunches('')).toBe(false);
    expect(validate.flakyWidgetNumberOfLaunches(1)).toBe(false);
    expect(validate.flakyWidgetNumberOfLaunches(601)).toBe(false);
  });
});

describe('validate.launchesWidgetContentFields', () => {
  test('validation should be correct', () => {
    expect(validate.launchesWidgetContentFields(['1', '2', '3', '4'])).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.launchesWidgetContentFields(undefined)).toBe(false);
    expect(validate.launchesWidgetContentFields([])).toBe(false);
    expect(validate.launchesWidgetContentFields(['1', '2', '3'])).toBe(false);
  });
});

describe('validate.mostFailedWidgetNumberOfLaunches', () => {
  test('validation should be correct', () => {
    expect(validate.mostFailedWidgetNumberOfLaunches(2)).toBe(true);
    expect(validate.mostFailedWidgetNumberOfLaunches(600)).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.mostFailedWidgetNumberOfLaunches(undefined)).toBe(false);
    expect(validate.mostFailedWidgetNumberOfLaunches('')).toBe(false);
    expect(validate.mostFailedWidgetNumberOfLaunches(1)).toBe(false);
    expect(validate.mostFailedWidgetNumberOfLaunches(601)).toBe(false);
  });
});

describe('validate.notificationRecipients', () => {
  test('validation should be correct', () => {
    expect(validate.notificationRecipients(true)(['example'])).toBe(true);
    expect(validate.notificationRecipients(false)(['example'])).toBe(true);
    expect(validate.notificationRecipients(true)(undefined)).toBe(true);
    expect(validate.notificationRecipients(true)([])).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.notificationRecipients(false)([])).toBe(false);
  });
});

describe('validate.notificationLaunchNames', () => {
  test('validation should be correct', () => {
    expect(validate.notificationLaunchNames(['a'])).toBe(true);
    expect(validate.notificationLaunchNames(['launch name'])).toBe(true);
  });
  test('Validation should not be correct', () => {
    expect(validate.notificationLaunchNames(undefined)).toBe(false);
    expect(validate.notificationLaunchNames([])).toBe(false);
    expect(validate.notificationLaunchNames([' '])).toBe(false);
    const textLonger256 =
      'this is very long text aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    expect(validate.notificationLaunchNames([textLonger256])).toBe(false);
  });
});
