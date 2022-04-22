![Github](./src/assets/geotone.png)

# Team Members

> | Contributing Team Members | Github                                       | LinkedIn                                                 |
> | ------------------------- | -------------------------------------------- | -------------------------------------------------------- |
> | Minoka Kakizaki           | [Github](https://github.com/kakizaki55)      | [LinkedIn](https://www.linkedin.com/in/minoka-kakizaki/) |
> | Jordan Laurent            | [Github](https://github.com/jlaurentpdx)     | [LinkedIn](https://www.linkedin.com/in/jlaurentpdx/)     |
> | Michelle Nygren           | [Github](https://github.com/michellerenehey) | [LinkedIn](https://www.linkedin.com/in/michellenygren/)  |
> | Forest Heims              | [Github](https://github.com/forestheims)     | [LinkedIn](https://www.linkedin.com/in/forestheims/)     |

# Project Description

Geo Tone is a full-stack browser-based audio sequencer built using React, Reactronica (from Tone.js), CSS, PostgreSQL and Express. Geo Tone exists to make music fun - letting new-to-synth users experiment with customized audio effects. On the frontend, user data is hashed and encrypted; on the backend, data is managed in SQL.

# Dependencies

- [Tone.js](https://tonejs.github.io/)
- [Reactronica](https://reactronica.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Alchemy Code Lab Bootstrap Template](https://npm.io/package/@alchemycodelab/create-app)

# Backend API

- Main Deploy: <https://geo-tone.herokuapp.com/>
- Staging Deploy: <https://geo-tone-staging.herokuapp.com/>

## Routes:

### User Routes

- `POST /api/v1/users/`
- `POST /api/v1/users/sessions`
- `GET /api/v1/users/count`
- `GET /api/v1/users/me`
- `DELETE /api/v1/users/sessions`
- `DELETE /api/v1/users/:user_id`

### Project Routes

- `POST /api/v1/projects/`
- `GET /api/v1/projects/`
- `GET /api/v1/projects/count`
- `GET /api/v1/projects/:project_id`
- `GET /api/v1/projects/user/:user_id`
- `PATCH /api/v1/projects/:project_id`
- `DELETE /api/v1/projects/:project_id`

### Profile Routes

- `POST /api/v1/profiles/`
- `GET /api/v1/profiles/`
- `GET /api/v1/profiles/:username`
- `PATCH /api/v1/profiles/:username`
