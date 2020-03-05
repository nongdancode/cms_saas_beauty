(function() {
  const module = angular.module('app.mock', []);

  module.config(function(RestangularProvider) {
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
