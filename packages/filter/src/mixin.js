import XEUtils from 'xe-utils/methods/xe-utils'
import { UtilTools, DomTools } from '../../tools'

export default {
  methods: {
    /**
     * 手动调用筛选的方法
     * 如果不传回调则返回一个选项列表的 Promise 对象
     * 如果传回调则通过回调返回的值更新选项列表，并返回一个新选项列表的 Promise 对象
     * @param {String} field 字段名
     * @param {Function} callback 重置列表的回调函数，返回新的选项列表
     */
    _filter (field, callback) {
      let column = this.getColumnByField(field)
      if (column) {
        let filters = column.filters
        if (callback) {
          let rest = callback(filters)
          if (XEUtils.isArray(rest)) {
            column.filters = UtilTools.getFilters(rest)
          }
        }
        return this.$nextTick().then(() => filters)
      }
      return this.$nextTick()
    },
    /**
     * 点击筛选事件
     * 当筛选图标被点击时触发
     * 更新选项是否全部状态
     * 打开筛选面板
     * @param {Event} evnt 事件
     * @param {ColumnConfig} column 列配置
     * @param {Object} params 参数
     */
    triggerFilterEvent (evnt, column, params) {
      let { $refs, filterStore } = this
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        let filterWrapper = $refs.filterWrapper
        let bodyElem = $refs.tableBody.$el
        let { target: targetElem, pageX } = evnt
        let { visibleWidth } = DomTools.getDomNode()
        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column,
          style: null,
          visible: true
        })
        filterStore.isAllSelected = filterStore.options.every(item => item.checked)
        filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item.checked)
        this.$nextTick(() => {
          let filterWrapperElem = filterWrapper.$el
          let filterWidth = filterWrapperElem.offsetWidth
          let centerWidth = filterWidth / 2
          let minMargin = 32
          let left, right
          let style = {
            top: `${targetElem.offsetTop + targetElem.offsetParent.offsetTop + targetElem.offsetHeight + 8}px`
          }
          if (column.fixed === 'left') {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth
          } else if (column.fixed === 'right') {
            right = (targetElem.offsetParent.offsetWidth - targetElem.offsetLeft) + (targetElem.offsetParent.offsetParent.offsetWidth - targetElem.offsetParent.offsetLeft) - column.renderWidth - centerWidth
          } else {
            left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth - bodyElem.scrollLeft
          }
          if (left) {
            let overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
            if (overflowWidth > 0) {
              left -= overflowWidth
            }
            style.left = `${Math.max(minMargin, left)}px`
          } else if (right) {
            let overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
            if (overflowWidth > 0) {
              right += overflowWidth
            }
            style.right = `${right}px`
          }
          filterStore.style = style
        })
      }
    },
    /**
     * 确认筛选
     * 当筛选面板中的确定按钮被按下时触发
     * @param {Event} evnt 事件
     */
    confirmFilterEvent (evnt) {
      let { visibleColumn, filterStore, remoteFilter, filterOpts, scrollXLoad, scrollYLoad } = this
      let { column } = filterStore
      let { property } = column
      let values = []
      let datas = []
      column.filters.forEach(item => {
        if (item.checked) {
          values.push(item.value)
          datas.push(item.data)
        }
      })
      filterStore.visible = false
      // 如果是服务端筛选，则跳过本地筛选处理
      if (!(filterOpts.remote || remoteFilter)) {
        this.handleTableData(true)
      }
      let filterList = []
      visibleColumn.filter(column => {
        let { property, filters } = column
        let valueList = []
        let dataList = []
        if (filters && filters.length) {
          filters.forEach(item => {
            if (item.checked) {
              valueList.push(item.value)
              dataList.push(item.data)
            }
          })
          // 在 v3.0 中废弃 prop
          filterList.push({ column, property, field: property, prop: property, values: valueList, datas: dataList })
        }
      })
      // 在 v3.0 中废弃 prop
      UtilTools.emitEvent(this, 'filter-change', [{ column, property, field: property, prop: property, values, datas, filters: filterList, $table: this }])
      this.updateFooter()
      if (scrollXLoad || scrollYLoad) {
        this.clearScroll()
        if (scrollYLoad) {
          this.updateScrollYSpace()
        }
      }
      this.closeFilter()
      this.$nextTick(this.recalculate)
    },
    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    resetFilterEvent (evnt) {
      this.filterStore.options.forEach(item => {
        item.checked = false
        item.data = item._data
      })
      this.confirmFilterEvent(evnt)
    },
    /**
     * 清空指定列的筛选条件
     * 如果为空则清空所有列的筛选条件
     * @param {String} field 字段名
     */
    _clearFilter (field) {
      let column = arguments.length ? this.getColumnByField(field) : null
      let filterStore = this.filterStore
      let handleClear = column => {
        let { filters } = column
        if (filters && filters.length) {
          filters.forEach(item => {
            item.checked = false
            item.data = item._data
          })
        }
      }
      if (column) {
        handleClear(column)
      } else {
        this.visibleColumn.forEach(handleClear)
      }
      if (!column || column !== filterStore.column) {
        Object.assign(filterStore, {
          isAllSelected: false,
          isIndeterminate: false,
          style: null,
          options: [],
          column: null,
          multiple: false,
          visible: false
        })
      }
      return this.updateData()
    }
  }
}
