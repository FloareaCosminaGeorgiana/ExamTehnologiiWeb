require('dotenv').config({})
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const path = require('path')
const {start} = require('repl')

let sequelize

if (process.env.NODE_ENV === 'development') {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'sample.db',
        define: {
            timestamps: false
        }
    })
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    })
}

const Playlist = sequelize.define('playlist', {
    descriere: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 3
        }
    },
    data: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

const Song = sequelize.define('song', {
    titlu: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 5
        }
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isURL: true
        }
    },
    stil: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['POP', 'ALTERNATIVE', 'ROCK', 'TRAP']]
        }
    }
})

Playlist.hasMany(Song)

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use(express.json())

app.get('/playlists', async (req, res) => {
    try {
        const playlist = await Playlist.findAll()
        const page = req.query.page
        const limit = req.query.limit
        const sorting = req.query.sort
        const sort = req.query.sortBy
        const order = req.query.order
        const filters = req.query

        if (page && limit) {
            const startIndex = (page - 1) * limit
            const endIndex = page * limit
            const paginatedPlaylists = playlist.slice(startIndex, endIndex)
            res.status(200).json(paginatedPlaylists)
        } else if (sort && order) {
            const playlists = await Playlist.findAll()
            const sortedPlaylists = playlists.sort(function (x, y) {
                return x[sort] > y[sort]
            })
            if (order === 'desc') {
                sortedPlaylists.reverse()
            }
            res.status(200).json(sortedPlaylists);
        } else if (filters) {
            const playlists = await Playlist.findAll()
            const filteredPlaylists = playlists.filter(playlist => {
                let isValid = true
                for (key in filters) {
                    isValid = isValid && playlist[key] == filters[key]
                }
                return isValid
            });
            res.status(200).json(filteredPlaylists)
        } else
            res.status(200).json(playlist)
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.post('/playlists', async (req, res) => {
    try {
        await Playlist.create(req.body)
        res.status(201).json({message: 'created'})
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.get('/playlists/:bid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.bid, {include: Song})
        if (playlist) {
            res.status(200).json(playlist)
        } else {
            res.status(404).json({message: "not found"})
        }

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.put('/playlists/:bid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.bid)
        if (playlist) {
            await playlist.update(req.body, {fields: ['descriere', 'data']})
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({message: 'not found'})
        }

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.delete('/playlists/:bid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.bid)
        if (playlist) {
            await playlist.destroy()
            res.status(202).json({message: 'accepted'})
        } else {
            res.status(404).json({message: 'not found'})
        }

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.get('/playlists/:bid/songs', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.bid)
        if (playlist) {
            const songs = await playlist.getSongs()
            res.status(200).json(songs)
        } else {
            res.status(404).json({message: "not found"})
        }

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.post('/playlists/:bid/songs', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.bid)
        if (playlist) {
            const song = req.body
            song.playlistId = playlist.id
            await Song.create(song)
            res.status(201).json({message: 'created'})
        } else {
            res.status(404).json({message: 'not found'})
        }

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }


})

app.get('/playlists/:bid/songs/:cid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.bid)
        if (playlist) {
            const songs = await playlist.getSongs(({where: {id: req.params.cid}}))
            const song = songs.shift()
            if (song) {
                res.status(200).json(song)
            } else {
                res.status(404).json({message: "song not found"})
            }
        } else {
            res.status(404).json({message: "playlist not found"})
        }

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.put('/playlists/:bid/songs/:cid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.bid)
        if (playlist) {
            const songs = await playlist.getSongs(({where: {id: req.params.cid}}))
            const song = songs.shift()
            if (song) {
                await song.update(req.body)
                res.status(202).json({message: 'accepted'})
            } else {
                res.status(404).json({message: " songs not found"})
            }
        } else {
            res.status(404).json({message: "playlist not found"})
        }

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.delete('/playlists/:bid/songs/:cid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.bid)
        if (playlist) {
            const songs = await playlist.getSongs(({where: {id: req.params.cid}}))
            const song = songs.shift()
            if (song) {
                await song.destroy(req.body)
                res.status(202).json({message: 'accepted'})
            } else {
                res.status(404).json({message: " song not found"})
            }
        } else {
            res.status(404).json({message: "playlist not found"})
        }

    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.listen(process.env.PORT, async () => {
    await sequelize.sync({alter: true})
})