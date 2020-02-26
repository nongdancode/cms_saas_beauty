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
    EmployeePaymentType: {
        'm50/50': '50/50',
        'm70/30': '70/30',
        '50/50': {
            text: '50/50'
        },
        '70/30': {
            text: '70/30'
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

window.config = {
    baseUrl: 'http://api.beautysalonappsolution.com/'
};

window.config.baseApiUrl = window.config.baseUrl + 'api/admin/';


window.addEntity = (name, entity) => {
    window.entities = {
        ...(window.entities || {}),
        [name]: entity
    };
};

window.entityUrl = base => (entityName, viewType, identifierValue, identifierName) => {
    switch(viewType) {
    case 'ListView': {
        return base;
    }
    case 'EditView': {
        return base + '?id=' + identifierValue;
    }
    default: {
        return base;
    }
    }
};

window.httpCache = {};
