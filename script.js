(function() {
    'use strict';

    var app = angular.module('treeApp', ['ui.tree'])
    app.service('getData', function($http) {
        this.getCategoryData = function() {
            return $http({
                method: "GET",
                url: "http://transformers.fptechscience.com/assignment.php"
            })
        }
    })
    app.controller('folderCtrl', function($scope, getData) {

        var getRootNodesScope = function() {
            return angular.element(document.getElementById("tree-root")).scope();
        };

        $scope.collapseAll = function() {
            var scope = getRootNodesScope();
            scope.collapseAll();
        };

        $scope.expandAll = function() {
            var scope = getRootNodesScope();
            scope.expandAll();
        };


        // this code should be written seperately
        $scope.customizedFormat = (function() {
            function CustomizedFormat() {
                this.setCustomizedFormat = function() {
                }
                this.getCustomizedFormat = function(items) {
                    var parentChild = {};
                    var categoryCount = 0;
                    items.forEach(function(item) {
                        if (parentChild[item.parent]) {
                            parentChild[item.parent].childCounter++;
                            parentChild[item.name] = {
                                val: parentChild[item.parent].val + parentChild[item.parent].childCounter.toString(), // or you can multiply with 10, parentChild[item.parent].val * 10 + ....
                                childCounter: 0
                            }
                        } else {
                            parentChild[item.name] = {
                                val: ++categoryCount,
                                childCounter: 0
                            }
                        }
                    })

                    var result = []
                    for (var key in parentChild) {
                        var intermediate = result;
                        var itemId = parentChild[key].val.toString();

                        var pos = 0;
                        while (pos < itemId.length) {
                            for (var i = 0; i < intermediate.length; i++) {
                                if (itemId[pos] == intermediate[i].id.toString()[pos]) {
                                    intermediate = intermediate[i].nodes;
                                    break;
                                }
                            }
                            pos++;
                        }
                        intermediate.push({
                            id: parentChild[key].val,
                            title: key,
                            nodes: []
                        })
                    }
                    return result;
                }

            }
            CustomizedFormat.init = function init() {

                return new CustomizedFormat();
            }
            return CustomizedFormat.init();
        })();



        // if the Api fails 
        var items = [{
                "name": "Mobiles & tablets",
                "id": 1,
                "parent": null
            },
            {
                "name": "Mobiles",
                "id": 2,
                "parent": "Mobiles & tablets"
            },
            {
                "name": "Mobile Accessories",
                "id": 3,
                "parent": "Mobiles & tablets"
            },
            {
                "name": "Tablets",
                "id": 4,
                "parent": "Mobiles & tablets"
            },
            {
                "name": "Samsung",
                "id": 5,
                "parent": "Mobiles"
            },
            {
                "name": "OnePlus",
                "id": 6,
                "parent": "Mobiles"
            },
            {
                "name": "MI",
                "id": 7,
                "parent": "Mobiles"
            },
            {
                "name": "Headphones",
                "id": 8,
                "parent": "Mobile Accessories"
            },
            {
                "name": "Mobile Covers",
                "id": 9,
                "parent": "Mobile Accessories"
            },
            {
                "name": "Chargers",
                "id": 10,
                "parent": "Mobile Accessories"
            },
            {
                "name": "Selfie Sticks",
                "id": 11,
                "parent": "Mobile Accessories"
            },
            {
                "name": "Screenguards",
                "id": 12,
                "parent": "Mobile Accessories"
            },
            {
                "name": "Lenovo",
                "id": 13,
                "parent": "Tablets"
            },
            {
                "name": "Apple",
                "id": 14,
                "parent": "Tablets"
            },
            {
                "name": "Samsung",
                "id": 15,
                "parent": "Tablets"
            },
            {
                "name": "Fashions",
                "id": 16,
                "parent": null
            },
            {
                "name": "Western Wear",
                "id": 17,
                "parent": "Fashions"
            },
            {
                "name": "Ethnic Wear",
                "id": 18,
                "parent": "Fashions"
            },
            {
                "name": "Footwear",
                "id": 19,
                "parent": "Fashions"
            },
            {
                "name": "Bag",
                "id": 20,
                "parent": "Fashions"
            },
            {
                "name": "Dresses",
                "id": 21,
                "parent": "Western Wear"
            },
            {
                "name": "Jeans",
                "id": 22,
                "parent": "Western Wear"
            },
            {
                "name": "Trousers",
                "id": 23,
                "parent": "Western Wear"
            },
            {
                "name": "Sarees",
                "id": 24,
                "parent": "Ethnic Wear"
            },
            {
                "name": "Kurtas",
                "id": 25,
                "parent": "Ethnic Wear"
            },
            {
                "name": "Lehenga Choli",
                "id": 26,
                "parent": "Ethnic Wear"
            },
            {
                "name": "Dress Material",
                "id": 27,
                "parent": "Ethnic Wear"
            },
            {
                "name": "Sandals",
                "id": 28,
                "parent": "Footwear"
            },
            {
                "name": "Flats",
                "id": 29,
                "parent": "Footwear"
            },
            {
                "name": "Heels",
                "id": 30,
                "parent": "Footwear"
            },
            {
                "name": "Wedges",
                "id": 31,
                "parent": "Footwear"
            },
            {
                "name": "Shoes",
                "id": 32,
                "parent": "Footwear"
            },
            {
                "name": "Sneakers",
                "id": 33,
                "parent": "Shoes"
            },
            {
                "name": "Boots",
                "id": 34,
                "parent": "Shoes"
            },
            {
                "name": "Ballerinas",
                "id": 35,
                "parent": "Shoes"
            },
            {
                "name": "Sports Shoes",
                "id": 36,
                "parent": "Shoes"
            },
            {
                "name": "Backpacks",
                "id": 37,
                "parent": "Bag"
            },
            {
                "name": "Shoulder Bags",
                "id": 38,
                "parent": "Bag"
            },
            {
                "name": "Sling Bags",
                "id": 39,
                "parent": "Shoulder Bags"
            },
            {
                "name": "Tote bags",
                "id": 40,
                "parent": "Shoulder Bags"
            },
            {
                "name": "Wallets",
                "id": 41,
                "parent": "Bag"
            },
            {
                "name": "Clutches",
                "id": 42,
                "parent": "Bag"
            }
        ];

        
         getData.getCategoryData().then(function(result) {
                console.log('sucess')
                $scope.data = $scope.customizedFormat.getCustomizedFormat(result.data);
            },
            function(err) {
                console.log('please enable cors request, if not check the api')
                $scope.data = $scope.customizedFormat.getCustomizedFormat(items);
            })



    });

})();