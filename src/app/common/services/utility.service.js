(function() {
  angular.module('service.utility', [])
    .factory('UtilityService', UtilityService);

  function UtilityService(HttpService) {
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

    service.upload = function(file) {
      return HttpService.upload(HttpService.generateUrl('upload-image'), 'file')(file);
    };

    return service;
  }
})();
