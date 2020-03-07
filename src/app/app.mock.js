(function() {
  const module = angular.module('app.mock', []);

  module.factory('HttpMockInterceptor', function(){
    var service = {};

    service.response = function(response) {
      const api = response.config.url
            .replace(window.config.baseUrl, '')
            .split('?')[0];

      switch (true) {
      case /api\/admin\/staffs/.test(api): {
        response.data = [
          {
            id: 1,
            name: 'Name 1',
            phone: 'Phone 1',
            status: 'booking',
            deposit: 0,
            invoice: {
              id: 1,
              tax: 10,
              about: {
                companyName: 'The lash supply',
                phone: '8327744593',
                address: {
                  streetAddress: 'Bellard',
                  city: 'Houston',
                  state: 'Texas'
                }
              },
              services: [
                {
                  name: 'Service 1',
                  discount: 10,
                  price: 10
                },
                {
                  name: 'Service 2',
                  discount: 20,
                  price: 20
                }
              ]
            }
          },
          {
            id: 2,
            name: 'Name 2',
            phone: 'Phone 2',
            status: 'checkin',
            deposit: 0,
            invoice: {
              id: 2,
              tax: 10,
              about: {
                companyName: 'The lash supply',
                phone: '8327744593',
                address: {
                  streetAddress: 'Bellard',
                  city: 'Houston',
                  state: 'Texas'
                }
              },
              services: [
                {
                  name: 'Service 1',
                  discount: 10,
                  price: 10
                },
                {
                  name: 'Service 2',
                  discount: 20,
                  price: 20
                }
              ]
            }
          }
        ];
        break;
      }
      case /api\/booking\/list_groups/.test(api): {
        response.data = [
          {
            id: 1,
            name: 'Lash'
          },
          {
            id: 2,
            name: 'Wax'
          }
        ];
        break;
      }
      case /api\/booking\/list_services/.test(api): {
        response.data = response.data.map((item, index) => {
          return {
            ...item,
            groupIds: [(index % 2) + 1]
          };
        });
        break;
      }
      case /api\/admin\/payment_report/.test(api): {
        response.data = {
          [moment().startOf('day').unix()]: {
            'return': 10,
            'chargeback': 20,
            'success': 30,
            'failed': 40
          },
          [moment().startOf('day').add('1', 'days').unix()]: {
            'return': 15,
            'chargeback': 25,
            'success': 35,
            'failed': 45
          },
          [moment().startOf('day').add('10', 'days').unix()]: {
            'return': 15,
            'chargeback': 25,
            'success': 35,
            'failed': 45
          },
          [moment().startOf('day').add('15', 'days').unix()]: {
            'return': 15,
            'chargeback': 25,
            'success': 35,
            'failed': 45
          },
          [moment().startOf('day').add('20', 'days').unix()]: {
            'return': 15,
            'chargeback': 25,
            'success': 35,
            'failed': 45
          },
          [moment().startOf('day').add('25', 'days').unix()]: {
            'return': 15,
            'chargeback': 25,
            'success': 35,
            'failed': 45
          }
        };
        break;
      }
      case /api\/admin\/customer_report_by_date/.test(api): {
        response.data = {
          [moment().startOf('day').unix()]: {
            'customerNumber': 10,
            'amount': 20
          },
          [moment().startOf('day').add('1', 'days').unix()]: {
            'customerNumber': 15,
            'amount': 25
          },
          [moment().startOf('day').add('10', 'days').unix()]: {
            'customerNumber': 15,
            'amount': 50
          },
          [moment().startOf('day').add('15', 'days').unix()]: {
            'customerNumber': 15,
            'amount': 80
          },
          [moment().startOf('day').add('20', 'days').unix()]: {
            'customerNumber': 15,
            'amount': 30
          },
          [moment().startOf('day').add('25', 'days').unix()]: {
            'customerNumber': 15,
            'amount': 5
          }
        };
        break;
      }
      case /api\/admin\/customer_report_by_age/.test(api): {
        response.data = {
          '20_35': 50,
          '35_50': 20,
          '50_60': 30
        };
        break;
      }
      case /shifts\/\d+\/tasks/.test(api): {
        response.data = [
          {
            id: 1,
            name: "Hybrid Lash 1",
            stepping: 60,
            img: "",
            start: moment().unix(),
            end: moment().add(2, 'hours').unix(),
            type: "active"
          },
          {
            id: 2,
            name: "Hybrid Lash 2",
            stepping: 60,
            img: "",
            start: moment().add(2, 'hours').unix(),
            end: moment().add(4, 'hours').unix(),
            type: "booking"
          },
          {
            id: 3,
            name: "Hybrid Lash 3",
            stepping: 60,
            img: "",
            start: moment().add(4, 'hours').unix(),
            end: moment().add(6, 'hours').unix(),
            type: "disable"
          }
        ];
        break;
      }
      case /schedules\/\d+\/shifts/.test(api): {
        response.data = [
          {
            id: 1,
            start: moment().unix(),
            end: moment().add(8, 'hours').unix(),
            count: {
              booking: 10
            }
          },
          {
            id: 2,
            start: moment().add(1, 'days').unix(),
            end: moment().add(1, 'days').add(8, 'hours').unix(),
            count: {
              booking: 20
            }
          }
        ];
        break;
      }
      }

      return response;
    };

    return service;
  });

  module.config(function($httpProvider, RestangularProvider) {
    $httpProvider.interceptors.push('HttpMockInterceptor');

    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
      if (['get', 'getList'].includes(operation)) {
        if (what === 'group') {
          return [
            {
              id: 1,
              name: 'Group 1'
            },
            {
              id: 2,
              name: 'Group 2'
            }
          ];
        }

        if (what === 'service') {
          return [
            {
              id: 1,
              img: 'https://eyelashexcellence.com/wp-content/uploads/2015/06/volume-lash-course.jpg',
              name: 'Volume Lash 1',
              stepping: 90,
              price: 79,
              userIds: [2, 3, 4],
              groupIds: [1]
            },
            {
              id: 2,
              img: 'https://eyelashexcellence.com/wp-content/uploads/2015/06/volume-lash-course.jpg',
              name: 'Volume Lash 2',
              stepping: 90,
              price: 79,
              userIds: [2, 3, 4],
              groupIds: [2]
            },
            {
              id: 3,
              img: 'https://eyelashexcellence.com/wp-content/uploads/2015/06/volume-lash-course.jpg',
              name: 'Volume Lash 3',
              stepping: 90,
              price: 79,
              userIds: [2, 3, 4],
              groupIds: [1, 2]
            }
          ];
        }

        if (what === 'promotion') {
          return [
            {
              id: 1,
              name: 'Promotion 1',
              description: 'Id velit ut tortor pretium.',
              status: 'Status 1',
              discount_rate: 15,
              active: true
            },
            {
              id: 2,
              name: 'Promotion 2',
              description: 'Scelerisque eleifend donec pretium vulputate.',
              status: 'Status 2',
              discount_rate: 30,
              active: false
            }
          ];
        }

        if (what === 'waitlist') {
          return [
            {
              id: 1,
              name: 'Name 1',
              phone: 'Phone 1',
              status: 'booking',
              invoice: {
                id: 1,
                tax: 10,
                deposit: 10,
                about: {
                  companyName: 'The lash supply',
                  phone: '8327744593',
                  address: {
                    streetAddress: 'Bellard',
                    city: 'Houston',
                    state: 'Texas'
                  }
                },
                services: [
                  {
                    name: 'Service 1',
                    discount: 10,
                    price: 10
                  },
                  {
                    name: 'Service 2',
                    discount: 20,
                    price: 20
                  }
                ]
              }
            },
            {
              id: 2,
              name: 'Name 2',
              phone: 'Phone 2',
              status: 'checkin',
              deposit: 0,
              invoice: {
                id: 2,
                tax: 10,
                about: {
                  companyName: 'The lash supply',
                  phone: '8327744593',
                  address: {
                    streetAddress: 'Bellard',
                    city: 'Houston',
                    state: 'Texas'
                  }
                },
                services: [
                  {
                    name: 'Service 1',
                    discount: 10,
                    price: 10
                  },
                  {
                    name: 'Service 2',
                    discount: 20,
                    price: 20
                  }
                ]
              }
            }
          ];
        }
      }

      return data;
    });
  });
})();
