export interface MenuItemType {
    label: string;
    to: string;
    children?: MenuItemType[]
}

export const sideMenu = [
    {
        label: "Home",
        to: "/"
    }, 
    {
        label: "Profile",
        to: "/profile",
        children: [
            {
                label: "Details",
                to: "detail",
                children: [
                    {
                    label: "Location",
                    to: "location"
                }
                ]
            }
        ]
    },
    {
        label: "Settings",
        to: "/settings",
        children: [
            {
                label: "Account",
                to: "account",
            },
            {
                label: "Security",
                to: "security",
                children: [
                    {
                        label: "Login",
                        to: "login",
                    },
                    {
                        label: "Register",
                        to: "register"
                    }
                ]
            }
        ]
    }
]