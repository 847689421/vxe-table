<template>
  <div>
    <p class="tip">虚拟滚动渲染，可编辑表格<br><span class="red">当数据量非常大时，由于需要进行大量数据运算，所以数据校验或者获取数据...等函数执行会相对耗时</span></p>

    <vxe-toolbar export :refresh="{query: findList}">
      <template v-slot:buttons>
        <vxe-button>
          <template>新增操作</template>
          <template v-slot:dropdowns>
            <vxe-button @click="insertEvent(null)">从第一行插入</vxe-button>
            <vxe-button @click="insertEvent(-1)">从最后插入</vxe-button>
            <vxe-button @click="insertEvent($refs.xTable.getData(100))">插入到 100 行</vxe-button>
            <vxe-button @click="insertEvent($refs.xTable.getData(500))">插入到 500 行</vxe-button>
          </template>
        </vxe-button>
        <vxe-button>
          <template>删除操作</template>
          <template v-slot:dropdowns>
            <vxe-button @click="$refs.xTable.removeSelecteds()">删除选中</vxe-button>
            <vxe-button @click="$refs.xTable.remove($refs.xTable.getData(0))">删除第一行</vxe-button>
            <vxe-button @click="$refs.xTable.remove($refs.xTable.getData($refs.xTable.getData().length - 1))">删除最后一行</vxe-button>
            <vxe-button @click="$refs.xTable.remove($refs.xTable.getData(100))">删除第 100 行</vxe-button>
          </template>
        </vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable"
      height="300"
      :loading="loading"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :checkbox-config="{checkField: 'checked'}">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" width="200"></vxe-table-column>
      <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
      <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
      <vxe-table-column field="attr1" title="Attr1" width="200"></vxe-table-column>
      <vxe-table-column field="attr2" title="Attr2" width="200"></vxe-table-column>
      <vxe-table-column field="attr3" title="Attr3" width="200"></vxe-table-column>
      <vxe-table-column field="attr4" title="Attr4" width="200"></vxe-table-column>
      <vxe-table-column field="attr5" title="Attr5" width="200"></vxe-table-column>
      <vxe-table-column field="attr6" title="Attr6" width="200"></vxe-table-column>
      <vxe-table-column field="attr7" title="Attr7" width="200"></vxe-table-column>
      <vxe-table-column field="attr8" title="Attr8" width="200"></vxe-table-column>
      <vxe-table-column field="attr9" title="Attr9" width="200"></vxe-table-column>
      <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      demoCodes: [
        `
        <vxe-toolbar export :refresh="{query: findList}">
          <template v-slot:buttons>
            <vxe-button>
              <template>新增操作</template>
              <template v-slot:dropdowns>
                <vxe-button @click="insertEvent(null)">从第一行插入</vxe-button>
                <vxe-button @click="insertEvent(-1)">从最后插入</vxe-button>
                <vxe-button @click="insertEvent($refs.xTable.getData(100))">插入到 100 行</vxe-button>
                <vxe-button @click="insertEvent($refs.xTable.getData(500))">插入到 500 行</vxe-button>
              </template>
            </vxe-button>
            <vxe-button>
              <template>删除操作</template>
              <template v-slot:dropdowns>
                <vxe-button @click="$refs.xTable.removeSelecteds()">删除选中</vxe-button>
                <vxe-button @click="$refs.xTable.remove($refs.xTable.getData(0))">删除第一行</vxe-button>
                <vxe-button @click="$refs.xTable.remove($refs.xTable.getData($refs.xTable.getData().length - 1))">删除最后一行</vxe-button>
                <vxe-button @click="$refs.xTable.remove($refs.xTable.getData(100))">删除第 100 行</vxe-button>
              </template>
            </vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable"
          height="300"
          :loading="loading"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :checkbox-config="{checkField: 'checked'}">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable width="200" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="200" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="200"></vxe-table-column>
          <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
          <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
          <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  let tableData = window.MOCK_DATA_LIST.slice(0, 600)
                  // 阻断 vue 对大数组的监听，避免 vue 绑定大数据造成短暂的卡顿
                  if (this.$refs.xTable) {
                    this.$refs.xTable.loadData(tableData)
                  }
                  resolve()
                  this.loading = false
                }, 300)
              })
            },
            insertEvent (row) {
              let xTable = this.$refs.xTable
              let record = {}
              xTable.insertAt(record, row).then(({ row }) => {
                xTable.setActiveRow(row)
              })
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTable.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTable.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          let tableData = window.MOCK_DATA_LIST.slice(0, 600)
          // 阻断 vue 对大数组的监听，避免 vue 绑定大数据造成短暂的卡顿
          if (this.$refs.xTable) {
            this.$refs.xTable.loadData(tableData)
          }
          resolve()
          this.loading = false
        }, 300)
      })
    },
    insertEvent (row) {
      let xTable = this.$refs.xTable
      let record = {}
      xTable.insertAt(record, row).then(({ row }) => {
        xTable.setActiveRow(row)
      })
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTable.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTable.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
