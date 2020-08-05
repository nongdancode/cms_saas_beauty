(function(){
  const module = angular.module('module.customer.components.upload-excel', []);

  class UploadExcelComponent {
    constructor($scope, $timeout, ModalService, UtilityService, MarketingService) {
      this.$scope = $scope;
      this.$timeout = $timeout;
      this.ModalService = ModalService;
      this.UtilityService = UtilityService;
      this.MarketingService = MarketingService;
    }

    $onInit() {
      this.id = `file-${Date.now()}`;

      setTimeout(() => {
        const fileEl = document.querySelector('#' + this.id);

        fileEl.addEventListener('change', this.handleChange.bind(this));
      });
    }

    parseCSV(data) {
      return CSV.parse(data);
    }

    convertCSV(filename, data) {
      let result = data;

      if (filename.includes('.xlsx')) {
        const workbook = XLSX.read(data, { type: 'binary' });

        result = XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[0]]);
      }

      return result;
    }

    readFile(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = function(e) {
          resolve(e.target.result);
        };

        reader.readAsBinaryString(file);
      });
    }

    handleChange(e) {
      if (e.target.files.length === 0) {
        return;
      }

      const file = e.target.files[0];

      this.readFile(file)
          .then(this.convertCSV.bind(this, file.name))
          .then(this.parseCSV.bind(this))
          .then(csv => {
            const [fields, ...data] = csv;

            return data.reduce((result, row) => {
              const parsed = row.reduce((result, value, index) => {
                const key = fields[index].trim();

                return {
                  ...result,
                  [key]: value
                }
              }, {});

              return [
                ...result,
                parsed
              ];
            }, []);
          })
          .then(data => {
            this.MarketingService.importBulkCustomer(data)
                .then(res => {
                  this.ModalService.success('Upload customer list successfully!');
                })
                .catch(response => alert(response.error || 'Maintainence in progress.'));
          })
    }
  }

  module.component('maUploadExcel', {
    bindings: {
      selection: '<'
    },
    controller: UploadExcelComponent,
    templateUrl: 'app/modules/customer/components/upload-excel/upload-excel.component.html'
  });
})();
