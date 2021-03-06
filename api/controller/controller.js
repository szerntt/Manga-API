'use strict';

const { json } = require('express');
const services = require("../services/services");// Require 'bluebird' in your package.json file, and run npm install.
const fs = require('fs');
const marked = require('marked');
const redis = require('redis');
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const client = redis.createClient();

exports.not_found = (req, res) => {
    res.status(404).json({
        message: "API path not found, please read documentation again"
    })
}

exports.get_documentation = (req, res) => {
    var path = 'README.md';
    var file = fs.readFileSync(path, 'utf8');
    res.send(marked(file.toString()));
}

exports.api_cache = (req, res) => {
    client.get('/api/', (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.api(req, res);
    });
}

exports.get_manga_detail_cache = (req, res) => {
    const manga_endpoint = req.params.manga_endpoint;

    client.get(manga_endpoint, (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_manga_detail(req, res);
    })
}

exports.get_hot_manga_update_cache = (req, res) => {
    client.get('/api/hot_manga_update/', (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_hot_manga_update(req, res);
    })
}

exports.get_chapter_cache = (req, res) => {
    const chapter_endpoint = req.params.chapter_endpoint;

    client.get(chapter_endpoint, (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_chapter(req, res);
    })
}

exports.get_all_genre_cache = (req, res) => {

    client.get('/api/genre/all', (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_all_genre(req, res);
    })
}

exports.get_genre_cache = (req, res) => {
    const genre_endpoint = req.params.genre_endpoint;
    const page_number = req.params.page_number;
    client.get(genre_endpoint + page_number, (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_genre(req, res);
    });
}

exports.get_latest_update_cache = (req, res) => {
    const page_number = req.params.page_number;

    client.get('/api/latest_update/' + page_number, (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_latest_update(req, res)
    });
}

exports.get_search_manga_cache = (req, res) => {
    const query = req.query.query;

    client.get('search: ' + query, (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_search_manga(req, res);
    });
}

exports.get_all_manga_cache = (req, res) => {
    const page_number = req.params.page_number;

    client.get('manga/' + page_number, (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_all_manga(req, res);
    });
}

exports.get_all_manhwa_cache = (req, res) => {
    const page_number = req.params.page_number;

    client.get('manhwa/' + page_number, (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_all_manhwa(req, res);
    });
}

exports.get_all_manhua_cache = (req, res) => {
    const page_number = req.params.page_number;

    client.get('manhua/' + page_number, (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_all_manhua(req, res);
    });
}

exports.get_best_series_cache = (req, res) => {
    client.get('best-series', (err, result) => {
        if (result) {
            const parseResult = JSON.parse(result);
            res.send(parseResult);
        }
        else
            services.get_best_series(req, res);
    });
}