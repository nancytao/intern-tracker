angular.module('app').controller('ModalCtrl', function($uibModal, $log) {
	var $ctrl = this;
	$ctrl.items = ['figure', 'this', 'out', 'later'];

	$ctrl.animationsEnabled = true;

	$ctrl.open = function(size) {
		console.log("pls open");
		var modalInstance = $uibModal.open({
			animation: $ctrl.animationsEnabled,
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: 'modalContent.html',
			controller: 'ModalInstanceCtrl',
			controllerAs: '$ctrl',
			size: size,
			resolve: {
				items: function() {
					return $ctrl.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$ctrl.selected = selectedItem;
		}, function() {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$ctrl.openComponentModal = function () {
		var modalInstance = $uibModal.open({
			animation: $ctrl.animationsEnabled,
			component: 'modalComponent',
			resolve: {
				items: function() {
					return $ctrl.items;
				}
			}
		});
		modalInstance.result.then(function(selectedItem) {
			$ctrl.selected = selectedItem;
		}, function() {
			$log.info('modal-component dismissed at: ' + new Date());
		});
	};
});

angular.module('app').controller('ModalInstanceCtrl', function($uibModalInstance, items) {
	var $ctrl = this;
	$ctrl.items = items;
	$ctrl.selected = {
		item: $ctrl.items[0]
	};

	$ctrl.ok = function() {
		$uibModalInstance.close($ctrl.selected.item);
	};

	$ctrl.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});

angular.module('app').component('modalComponent', {
	templateUrl: 'modalContent.html',
	bindings: {
		resolve: '<',
		close: '&',
		dismiss: '&'
	},
	controller: function() {
		var $ctrl = this;

		$ctrl.$onInit = function() {
			$ctrl.items = $ctrl.resolve.items;
			$ctrl.selected = {
				item: $ctrl.items[0]
			};
		};

		$ctrl.ok = function() {
			$ctrl.close({$value: $ctrl.selected.item});
		};

		$ctrl.cancel = function() {
			$ctrl.dismiss({$value: 'cancel'});
		};
	}
});