describe('Bonus task 4 - check menu item service', function () {

  var menuservice;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuservice = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('Should return the categories list', function() {
    $httpBackend.whenGET(ApiPath + '/categories.json').respond(['Lunch', 'Appetizers']);
    menuservice.getCategories().then(function(response) {
      expect(response).toEqual(['Lunch', 'Appetizers']);
    });
    $httpBackend.flush();
  });

  it('Should return menu items for category A', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items.json?category=A').respond(['Won Ton Soup with Chicken', 'Egg Drop Soup']);
    menuservice.getMenuItems('A').then(function(response) {
      expect(response).toEqual(['Won Ton Soup with Chicken', 'Egg Drop Soup']);
    });
    $httpBackend.flush();
  });

  it('Should return the menu item for short name A1', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A1.json').respond(['Won Ton Soup with Chicken']);
    menuservice.getMenuItemByShortName('A1').then(function(response) {
      expect(response).toEqual(['Won Ton Soup with Chicken']);
    });
    $httpBackend.flush();
  });
  it('Should return the menu item for short name A2', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A2.json').respond(['Egg Drop Soup']);
    menuservice.getMenuItemByShortName('A2').then(function(response) {
      expect(response).toEqual(['Egg Drop Soup']);
    });
    $httpBackend.flush();
  });

    it('Should return 500 error for an invalid menu item', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/FAKE.json').respond(500);
    menuservice.getMenuItemByShortName('FAKE').then(
      function(response) {
      }, 
      function error(error) {
        expect(error.status).toEqual(500);
    });
    $httpBackend.flush();
  });

});
