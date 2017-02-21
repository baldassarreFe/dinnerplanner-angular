import { DinnerplannerAngularPage } from './app.po';

describe('dinnerplanner-angular App', () => {
  let page: DinnerplannerAngularPage;

  beforeEach(() => {
    page = new DinnerplannerAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
