<script>
import commonMixin from 'vue-baidu-map/components/base/mixins/common.js'
import {createSize} from 'vue-baidu-map/components/base/factory.js'

export default {
  name: 'ListControl',
  render () {},
  mixins: [commonMixin('control')],
  props: {
    anchor: {
      type: String
    },
    offset: {
      type: Object
    },
    type: {
      type: String
    },
    showZoomInfo: {
      type: Boolean
    },
    enableGeolocation: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    anchor () {
      this.reload()
    },
    offset () {
      this.reload()
    },
    type () {
      this.reload()
    },
    showZoomInfo () {
      this.reload()
    }
  },
  methods: {
			load () {
			const {BMap, map, anchor, offset, type, showZoomInfo, enableGeolocation} = this
			this.originInstance = new BMap.NavigationControl({
				anchor: global[anchor],
				offset: offset && createSize(BMap, offset),
				type: global[type],
				showZoomInfo,
				enableGeolocation
			})
			map.addControl(this.originInstance)
		}
  }
}
</script>
