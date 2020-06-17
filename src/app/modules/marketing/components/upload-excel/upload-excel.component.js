(function(){
  const module = angular.module('module.marketing.components.upload-excel', []);

  class UploadExcelComponent {
    constructor($scope, $timeout, ModalService, UtilityService, MarketingService) {
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.ModalService = ModalService;
      this.UtilityService = UtilityService;
      this.MarketingService = MarketingService;
      this.ModalService = ModalService;
    }

    $onInit() {
      this.uploader = new this.UtilityService.upload('list_cus');
    }

    upload() {
      this.uploader.__upload().then(result => {
        this.ModalService.success('Upload customer list successfully!');
      });
    }
  }

  module.component('maUploadExcel', {
    bindings: {
      selection: '<'
    },
    controller: UploadExcelComponent,
    templateUrl: 'app/modules/marketing/components/upload-excel/upload-excel.component.html'
  });
})();
