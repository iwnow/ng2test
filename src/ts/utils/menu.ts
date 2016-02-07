export class SidebarMenu {
    constructor(
        public Items:MenuItem[]
    ){}
}

export class MenuItem {
    constructor(
        public Id: string,
        public TextItem: string,
        public Children?: MenuItem[]
    ){}
    
    IsActive: boolean;   
}