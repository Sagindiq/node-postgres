const { getData, getRow } = require('../../utils/postgres')

const users = `
    SELECT
        u.id, u.name,
        json_agg(
            CASE 
            WHEN 
                p.id IS NOT NULL 
            THEN 
                json_build_object(
                    'id', p.id,
                    'title', p.title,
                    'body', p.body,
                    'created_at', p.created_at
                )
            ELSE
                json_build_object(
                    'message', 'no post yet'
                )
            END
        ) AS posts
    FROM
    users u
    LEFT JOIN
    posts p
    ON
    u.id = p.user_id
    GROUP BY
    u.id
`

const user =  `
    SELECT
        u.id, u.name,
        json_agg(
            CASE 
            WHEN 
                p.id IS NOT NULL 
            THEN 
                json_build_object(
                    'id', p.id,
                    'title', p.title,
                    'body', p.body,
                    'created_at', p.created_at
                )
            ELSE
                json_build_object(
                    'message', 'no post yet'
                )
            END
        ) AS posts
    FROM
        (SELECT * FROM users WHERE id = $1) AS u
    LEFT JOIN
        posts p
    ON
        u.id = p.user_id
    GROUP BY
        u.id,
        u.name
`
const NEW_USER = `
    INSERT 
        INTO 
            users(name, gender, email, password)
            VALUES($1, $2, $3, $4)
    RETURNING *
`

const UPDATE_USER = `
    UPDATE
        users
    SET
        name = $1,
        gender = $2,
        email = $3,
        password = $4
    WHERE
        id = $5
    RETURNING *
`

const REMOVE_USER = `
    DELETE FROM
        users
    WHERE 
        id = $1
    RETURNING *
`

const allUser = () => getData(users);
const anUser = id => getRow(user, id);

const addUser = (name, gender, email, password) => getRow(NEW_USER, name, gender, email, password)
const updateUser = (name, gender, email, password, id) => getRow(UPDATE_USER, name, gender, email, password, id)

const removeUser = id => getRow(REMOVE_USER, id)

module.exports = {
    allUser,
    anUser,
    addUser,
    updateUser,
    removeUser
}