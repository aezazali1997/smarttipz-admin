
const sequelize = require('sequelize');

export const checkRoles = (pastPerms, currPerms) => {
  let rolesChanged = [];
  let added = false;
  for (let i = 0; i < pastPerms.length; i++) {
    if (pastPerms[i].value !== currPerms[i].value) {
      if (pastPerms[i].value === true) {
        added = false;
      } else {
        added = true;
      }
      rolesChanged.push(currPerms[i]);
    }
  }
  return {
    added,
    rolesChanged,
  };
};
export const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

export const getPagingData = (data, page, limit, name) => {
    const { count: totalVideos, rows: videos } = data;
    const currentPage = page ? + page : 0;
    const totalPages = Math.ceil(totalVideos / limit);

    return { totalVideos, videos, totalPages, currentPage };
};


export const getFilterAdmins = (search) => {
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
export const filterVideoContent = (search) => {
  if (containsSearchedView(search)) {
    let number = 0;
    try {
      number = search.split(" ")[0];
    } catch (error) {}
    return {
      [sequelize.Op.and]: [
        {
          isApproved: {
            [sequelize.Op.eq]: true,
          },
        },
        {
          views: {
            [sequelize.Op.eq]: Number(number),
          },
        },
      ],
    };
  }
  if (containsSearchedRating(search)) {
    let rating = 0;
    try {
      rating = search.split(" ")[0];
    } catch (error) {
      console.log("ERROR", error.message);
    }
    console.log("rating search");
    return {
      [sequelize.Op.and]: [
        {
          isApproved: {
            [sequelize.Op.eq]: true,
          },
        },
        {
          rating: {
            [sequelize.Op.eq]: Number(rating),
          },
        },
      ],
    };
  } else {
    return {
      [sequelize.Op.and]: [
        {
          isApproved: {
            [sequelize.Op.eq]: true,
          },
        },
      ],
    };
  }
};
export const containsSearchedView = (search) => {
  return search.includes("view") || search.includes("views");
};
export const containsSearchedRating = (search) => {
  return (
    search.includes("rated") ||
    search.includes("rate") ||
    search.includes("rating") ||
    search.includes("star")
  );
};
export const FilterContent = (search) => {
  if (!(containsSearchedView(search) || containsSearchedRating(search))) {
    return {
      [sequelize.Op.and]: [
        {
          isDeleted: {
            [sequelize.Op.eq]: false,
          },
        },
      ],
      [sequelize.Op.or]: [
        {
          name: {
            [sequelize.Op.iLike]: `%${search}%`,
          },
        },
        {
          email: {
            [sequelize.Op.iLike]: `%${search}%`,
          },
        },
        {
          username: {
            [sequelize.Op.iLike]: `%${search}%`,
          },
        },
      ],
    };
  }
};
export const filterWithDraw = (search) => {
  return {
    [sequelize.Op.or]: [
      {
        "$User.name$": {
          [sequelize.Op.iLike]: `%${search}%`,
        },
      },
      {
        "$User.email$": {
          [sequelize.Op.iLike]: `%${search}%`,
        },
      },
      {
        "$User.username$": {
          [sequelize.Op.iLike]: `%${search}%`,
        },
      },
    ],
  };
};