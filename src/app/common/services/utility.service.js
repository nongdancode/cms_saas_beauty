(function() {
  angular.module('service.utility', [])
    .factory('UtilityService', UtilityService);

  function UtilityService(HttpService, FileUploader) {
    const service = {};

    service.print = function(selector) {
      return new Promise((resolve, reject) => {
        var divContents = $(selector).html();
        var printWindow = window.open('', '', `height=${screen.height * 0.667},width=${screen.width * 0.667}`);
        printWindow.document.write('<html><head><title></title>');
        printWindow.document.write('</head><body >');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');
        printWindow.print();
        printWindow.close();

        resolve();
      });
    };

    service.upload = function(type) {
      const url = window.config.baseApiUrl + 'upload-image';
      const uploader = new FileUploader({
        url: url,
        formData: [
          {
            data: JSON.stringify({ type })
          }
        ]
      });

      uploader.filters.push({
        name: 'file',
        fn: function(item, options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
      });

      let result = [];

      uploader.onSuccessItem = (fileItem, response, status, headers) => {
        result.push(response.data);
      };

      uploader.__uploadAll = () => new Promise((resolve, reject) => {
        uploader.uploadAll();

        uploader.onCompleteAll = () => {
          resolve(result);
        };

        uploader.onError = () => {
          reject();
        };
      });

      uploader.__clearQueue = () => {
        result = [];
        uploader.clearQueue();
      };

      return uploader;
    };

    return service;
  }
})();
