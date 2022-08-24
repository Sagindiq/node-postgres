const { getData, getRow } = require('../../utils/postgres');

const posts = `
    SELECT
        p.id,
        p.title,
        p.body,
        p.created_at,
        u.name AS post_owner
    FROM
        posts p
    LEFT JOIN
        users u
    ON
        u.id = p.user_id
    ORDER BY
        p.id

`

const post = `
    SELECT
        p.id,
        p.title,
        p.body,
        p.created_at,
        u.name AS post_owner
    FROM
        (SELECT * FROM posts WHERE id = $1) AS p
    LEFT JOIN
        users u
    ON
        u.id = p.user_id
`

const NEW_POST = `
    INSERT INTO
        posts(title, body, user_id)
        VALUES($1, $2, $3)
    RETURNING *
`

const UPDATE_POST = `
    UPDATE
        posts
    SET
        title = $1,
        body = $2,
        user_id = $3
    WHERE
        id = $4
    RETURNING *
`

const DELETE_POST = `
    DELETE FROM
        posts
    WHERE 
        id = $1
    RETURNING *
`

const allPosts = () => getData(posts)
const aPost = id => getRow(post, id)

const addPost = (title, body, user_id) => getRow(NEW_POST, title, body, user_id)
const updatePost = (title, body, user_id, id) => getRow(UPDATE_POST, title, body, user_id, id)
const removePost = id => getRow(DELETE_POST, id);

module.exports = {
    allPosts,
    aPost,
    addPost,
    updatePost,
    removePost,
}