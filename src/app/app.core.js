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
        '20_35': '20_35',
        '35_50': '35_50',
        '50_60': '50_60'
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

window.config = {
    baseApiUrl: 'http://api.beautysalonappsolution.com/api/admin/'
};

window.addEntity = (name, entity) => {
    window.entities = {
        ...(window.entities || {}),
        [name]: entity
    };
};

window.httpCache = {};
