define([
    'Magento_Ui/js/grid/columns/column'
], function (Column) {
    'use strict';

    return Column.extend({
        defaults: {
            bodyTmpl: 'Nguyen_Student/grid/cells/group'
        },

        getLabel: function (row) {
            // Nếu là nhóm (group row)
            if (row._is_group) {
                return '<strong>' + row.type + '</strong>';
            }
            // Nếu là hàng con (child row)
            if (row._is_child) {
                return ''; // Không hiện gì ở cột Type
            }
            // Nếu không có gì đặc biệt
            return row[this.index] || '';
        }
    });
});