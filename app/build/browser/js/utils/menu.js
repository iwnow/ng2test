"use strict";
var SidebarMenu = (function () {
    //fix with set!
    function SidebarMenu(Items) {
        this.Items = Items;
        this.outerDataChanged = false;
    }
    return SidebarMenu;
}());
exports.SidebarMenu = SidebarMenu;
var MenuItem = (function () {
    function MenuItem(Id, TextItem, Children) {
        this.Id = Id;
        this.TextItem = TextItem;
        this.Children = Children;
    }
    return MenuItem;
}());
exports.MenuItem = MenuItem;
