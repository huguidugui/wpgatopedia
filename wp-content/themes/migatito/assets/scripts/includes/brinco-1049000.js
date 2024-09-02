module.exports = {
    init: function () {
        var menu_item_1049000 = document.getElementById("menu-item-1049000"); //Menu bottom Seguros de gastos Funerarios
        var brinco = document.createElement("br");

        if(menu_item_1049000 !== null) {
            this.insertAfter(menu_item_1049000, brinco);
        }

    },
    insertAfter: function (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }
  