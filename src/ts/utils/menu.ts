export class SidebarMenu {
    //fix with set!
    constructor(
        public Items:MenuItem[]
    ){}
    
    outerDataChanged: boolean = false;
}

export class MenuItem {
    constructor(
        public Id: string,
        public TextItem: string,
        public Children?: MenuItem[]
    ){}
    
    IsActive: boolean;   
}