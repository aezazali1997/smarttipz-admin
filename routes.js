import { faCog, faComment, faNewspaper, faPlayCircle, faUserCircle,faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Routes = [
    {
        name: 'Admin',
        path: '/dashboard/admin',
        permission: 'admin',
        icon: (<FontAwesomeIcon icon={faNewspaper} />)
    },
    {
        name: 'Business Verification',
        path: '/dashboard/business-verification',
        permission: 'businessVerification',
        icon: (<FontAwesomeIcon icon={faUserCircle} />)
    },
    {
        name: 'Manage Users',
        path: '/dashboard/manage-users',
        permission: 'manageUsers',
        icon: (<FontAwesomeIcon icon={faPlayCircle} />)
    },
    {
        name: 'Content Management',
        path: '/dashboard/content-management',
        permission: 'contentManagement',
        icon: (<FontAwesomeIcon icon={faComment} />)
    },
    {
        name:'Withdraw Requests',
        path:'/dashboard/withdraw-requests',
        permission:'withdrawRequests',
        icon:(<FontAwesomeIcon icon={faDollarSign}  className=" w-4"/>)
    }
]