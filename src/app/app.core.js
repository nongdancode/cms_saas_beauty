window.models = {
  ReportDateType: {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    day: {
      text: 'Day'
    },
    week: {
      text: 'Week'
    },
    month: {
      text: 'Month'
    }
  },
  AgeType: {
    'm20_35': '20_35',
    'm35_50': '35_50',
    'm50_60': '50_60',
    '20_35': {},
    '35_50': {},
    '50_60': {}
  },
  PaymentType: {
    SUCCESS: 'success',
    FAILED: 'failed',
    RETURN: 'return',
    CHARGEBACK: 'chargeback',
    success: {
      text: 'Success'
    },
    failed: {
      text: 'Failed'
    },
    return: {
      text: 'Return'
    },
    chargeback: {
      text: 'Charge Back'
    }
  },
  TransactionType: {
    CASH: 'cash',
    UNSETLED: 'unsetled',
    SETLED: 'setled',
    VOID: 'void',
    REFUNDED: 'refunded',
    cash: {
      text: 'Cash'
    },
    unsetled: {
      text: 'Unsetled'
    },
    setled: {
      text: 'Setled'
    },
    void: {
      text: 'Void'
    },
    refunded: {
      text: 'Refunded'
    }
  },
  EmployeePaymentType: {
      'CASH': 'cash',
      'CHECK': 'check',
      'cash': {
      text: 'Cash'
    },
      'check': {
      text: 'Check'
    }
  },
  EmployeeCommissionType: {
      '100_CHECK': '100_check',
      '50CHECK_50CASH': '50check_50cash',
      '100_check': {
      text: '100% Check'
    },
      '50check_50cash': {
      text: '50% Check 50% Cash'
    }
  },
  TaskType: {
    BOOKING: 'booking',
    SERVICE: 'service',
    ACTIVE: 'active',
    DISABLE: 'disable',
    booking: {
      text: 'Booking',
      color: '#50a'
    },
    service: {
      text: 'Service',
      color: '#0af'
    },
    active: {
      text: 'Active',
      color: '#0ea'
    },
    disable: {
      text: 'Disable',
      color: 'red'
    }
  },
  WaitStatus: {
    BOOKING: 'booking',
    CHECKIN: 'checkin',
    booking: {
      text: 'Booking'
    },
    checkin: {
      text: 'Checkin'
    }
  },
  Role: {
    STAFF: 'staff',
    OWNER: 'owner',
    staff: {
      text: 'staff'
    },
    owner: {
      text: 'Owner'
    }
  }
};

window.models.metadata = model => {
  return Object.keys(model).reduce((result, key) => {
    if (typeof model[key] === 'object') {
      return {
        ...result,
        [key]: { key, ...model[key] }
      };
    }

    return result;
  }, {});
};

window.models.arrayMetadata = model => {
  return Object.values(window.models.metadata(model));
};

window.resolveUrl = function resolveUrl( url ){
  var a = document.createElement('a');
  a.href=url; // set string url
  url = a.href; // get qualified url
  return url;
};

window.config = {
  baseUrl: window.location.hostname === 'localhost' ? 'https://thelash.bpsgroup.us/' : '/'
};

window.config.baseApiUrl = window.config.baseUrl + 'api/admin/';

window.menu = {};

window.menu.ref = [
  {
    key: 'check-in',
    name: 'Check-in & Waiting List',
    icon: 'glyphicon glyphicon-oil',
    src: '/waitlist/list'
  },
  {
    key: 'customer-management',
    name: 'Customer Management',
    icon: 'glyphicon glyphicon-shopping-cart',
    src: '/marketing/list',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'management',
    name: 'Management',
    icon: 'glyphicon glyphicon-time',
    active: path => path.includes('/staff/')
  },
  {
    key: 'schedule-management',
    name: 'Schedule Management',
    icon: 'glyphicon glyphicon-calendar',
    src: '/staff/list',
    active: path => path == '/staff/list',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'schedule-view',
    name: 'Schedule View',
    icon: 'glyphicon glyphicon-eye-open',
    src: '/staff/schedule',
    active: path => path == '/staff/schedule',
    role: [window.models.Role.STAFF]
  },
  {
    key: 'schedule-summary',
    name: 'Schedule Summary',
    icon: 'glyphicon glyphicon-eye-open',
    src: '/staff/shift',
    active: path => path == '/staff/shift',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'schedule-timeline',
    name: 'Schedule Timeline',
    icon: 'glyphicon glyphicon-hourglass',
    src: '/staff/shift-timeline',
    active: path => path == '/staff/shift',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'transaction-history',
    name: 'Transaction History',
    icon: 'glyphicon glyphicon-usd',
    src: '/transaction/list',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'promotion',
    name: 'Promotion',
    icon: 'glyphicon glyphicon-flash',
    src: '/promotion/list',
    role: [window.models.Role.OWNER]
  },,
  {
    key: 'loyalty',
    name: 'Loyalty (upgrade)',
    icon: 'glyphicon glyphicon-eye-close',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'report',
    name: 'Report',
    icon: 'glyphicon glyphicon-stats',
    active: path => path.includes('/report/'),
    role: [window.models.Role.OWNER]
  },
  {
    key: 'payment-report',
    name: 'Payment Report',
    icon: 'glyphicon glyphicon-stats',
    src: '/report/payment',
    active: path => path == '/report/payment',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'customer-report',
    name: 'Customer Report',
    icon: 'glyphicon glyphicon-equalizer',
    src: '/report/customer',
    active: path => path == '/report/customer',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'employee-statistic',
    name: 'Employee Statistic',
    icon: 'glyphicon glyphicon-user',
    src: '/report/employee-statistic',
    active: path => path == '/report/employee-statistic',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'employee',
    name: 'Employee Management',
    icon: 'glyphicon glyphicon-user',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'employee-management',
    name: 'Employee Management',
    icon: 'glyphicon glyphicon-tasks',
    src: '/employee/list',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'income-management',
    name: 'Income Management',
    icon: 'glyphicon glyphicon-usd',
    src: '/income/list',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'service',
    name: 'Service Management',
    icon: 'glyphicon glyphicon-tasks',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'group-management',
    name: 'Service Group Management',
    icon: 'glyphicon glyphicon-tasks',
    src: '/group/list',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'service-management',
    name: 'Service Management',
    icon: 'glyphicon glyphicon-tasks',
    src: '/service/list',
    role: [window.models.Role.OWNER]
  },
  {
    key: 'setting',
    name: 'Setting',
    icon: 'glyphicon glyphicon-cog',
    active: path => path.includes('/auth/')
  },
  {
    key: 'change-password',
    name: 'Change Password',
    icon: 'glyphicon glyphicon-user',
    src: '/auth/change-password',
    active: path => path == '/auth/change-password'
  },
  {
    key: 'logout',
    name: 'Logout',
    icon: 'glyphicon glyphicon-log-out',
    src: '/auth/logout',
    active: path => path == '/auth/logout'
  },
  {
    key: 'config',
    name: 'Config',
    icon: 'glyphicon glyphicon-cog',
    src: '/setting/config',
    active: path => path == '/setting/config'
  }
];

window.menu.refMap = window.menu.ref.reduce(
  (result, item) => {
    return {
      ...result,
      [item.key]: item
    };
  },
  {}
);

window.menu.tree = [
  {
    key: 'check-in'
  },
  {
    key: 'customer-management'
  },
  {
    key: 'management',
    children: [
      {
        key: 'schedule-management'
      },
      {
        key: 'schedule-view'
      },
      {
        key: 'schedule-summary'
      }
    ]
  },
  {
    key: 'transaction-history'
  },
  {
    key: 'promotion',
    children: [
      {
        key: 'loyalty'
      }
    ]
  },
  {
    key: 'report',
    children: [
      {
        key: 'payment-report'
      },
      {
        key: 'customer-report'
      },
      {
        key: 'employee-statistic'
      }
    ]
  },
  {
    key: 'employee',
    children: [
      {
        key: 'employee-management'
      },
      {
        key: 'income-management'
      }
    ]
  },
  {
    key: 'service',
    children: [
      {
        key: 'group-management'
      },
      {
        key: 'service-management'
      }
    ]
  },
  {
    key: 'setting',
    children: [
      {
        key: 'config'
      },
      {
        key: 'change-password'
      },
      {
        key: 'logout'
      }
    ]
  }
];

window.calendar = {
  key: '0409969224-fcs-1591071223'
};
