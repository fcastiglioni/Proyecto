<template>
  <div>
    <fridge
      v-for="fridge in fridges"
      :uuid="fridge.uuid"
      :key="fridge.uuid"
      :socket="socket">
    </fridge>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #f8f8f8;
    margin: 0;
  }
</style>

<script>
const request = require('request-promise-native')
const io = require('socket.io-client')
const { serverHost } = require('../config')
const socket = io.connect()

module.exports = {
  data () {
    return {
      fridges: [],
      error: null,
      socket
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    async initialize () {
      const options = {
        method: 'GET',
        url: `${serverHost}/fridges`,
        json: true
      }

      let result
      try {
        result = await request(options)
      } catch(e) {
        this.error = e.error.error
        return
      }

      this.fridges = result

      socket.on('fridge/connected', payload => {
        const { uuid } = payload.fridge
        const existing = this.fridges.find(a => a.uuid === uuid)
        if(!existing) {
          this.fridges.push(payload.fridge);
        }
      })
      
    }
  }
}
</script>