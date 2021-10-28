
const sequelize = require('sequelize');

export const getFilterAdmins = (search) => {
    console.log("searched >>", search);
    return {

        [sequelize.Op.and]: [
            {
                isDelete: {
                    [sequelize.Op.eq]: false
                },
            },
        ],
        [sequelize.Op.or]: [{
            name: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            email: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        }
        ]

    }
}

export const getUsers = (search) => {
    console.log("searched >>", search);
    return {
        [sequelize.Op.and]: [
            {
                isDeleted: {
                    [sequelize.Op.eq]: false
                },
            },
            {
                accountType: {
                    [sequelize.Op.eq]: 'Business'
                },
            },
        ],
        [sequelize.Op.or]: [{
            name: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            email: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            phoneNumber: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            username: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            '$Business.link$': {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        ]

    }
}
export const FilterPersonalUsers = (search) => {
    console.log("searched >>", search);
    return {
        [sequelize.Op.and]: [
            {
                isDeleted: {
                    [sequelize.Op.eq]: false
                },
            },
            {
                accountType: {
                    [sequelize.Op.eq]: 'Personal'
                },
            },
        ],
        [sequelize.Op.or]: [{
            name: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            email: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            phoneNumber: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        },
        {
            username: {
                [sequelize.Op.iLike]: `%${search}%`,
            }
        }
        ]

    }
}