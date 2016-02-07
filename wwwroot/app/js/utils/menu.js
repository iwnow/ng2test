var SidebarMenu = (function () {
    function SidebarMenu(Items) {
        this.Items = Items;
    }
    return SidebarMenu;
})();
exports.SidebarMenu = SidebarMenu;
var MenuItem = (function () {
    function MenuItem(Id, TextItem, Children) {
        this.Id = Id;
        this.TextItem = TextItem;
        this.Children = Children;
    }
    return MenuItem;
})();
exports.MenuItem = MenuItem;
//# sourceMappingURL=menu.js.map