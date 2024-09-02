module.exports = {
    init: function () {
          var menu_item_1050109 = document.getElementById("menu-item-1050109"); //Menu bottom Servicios de asistencia
          var brinco = document.createElement("br");

          if(menu_item_1050109 !== null ) {
              this.insertAfter(menu_item_1050109, brinco);
          }
    },

    insertAfter: function (referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }
  