<template>
  <div>
    <p class="tip">
      改变图标，通过设置 <table-api-link prop="expand-config"/>={<table-api-link prop="iconOpen"/>, <table-api-link prop="iconClose"/>} 局部替换默认的图标<br>
      也可以通过 <table-column-api-link prop="slot"/> 自定义内容模板
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable.toggleRowExpansion(tableData[1])">切换第二行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setRowExpansion([tableData[2], tableData[3]], true)">设置第三、四行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setAllRowExpansion(true)">设置所有行展开</vxe-button>
        <vxe-button @click="$refs.xTable.clearRowExpand()">关闭所有行展开</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      :expand-config="{iconOpen: 'fa fa-minus-square', iconClose: 'fa fa-plus-square'}"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" title="Name">
        <template v-slot="{ row, rowIndex }">
          <span>{{ row.name }}</span>
        </template>
        <template v-slot:content="{ row, rowIndex }">
          <template v-if="rowIndex === 1">
            <vxe-table
              border
              :data="tableData">
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table>
          </template>
          <template v-else>
            <ul>
              <li>
                <span>ID：</span>
                <span>{{ row.id }}</span>
              </li>
              <li>
                <span>Name：</span>
                <span>{{ row.name }}</span>
              </li>
              <li>
                <span>UpdateTime：</span>
                <span>{{ row.updateTime }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.createTime }}</span>
              </li>
            </ul>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          ref="xTable"
          border
          :expand-config="{iconOpen: 'fa fa-minus-square', iconClose: 'fa fa-plus-square'}"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" title="Name">
            <template v-slot="{ row, rowIndex }">
              <span>{{ row.name }}</span>
            </template>
            <template v-slot:content="{ row, rowIndex }">
              <template v-if="rowIndex === 1">
                <vxe-table
                  border
                  :data="tableData">
                  <vxe-table-column field="role" title="Role"></vxe-table-column>
                  <vxe-table-column field="age" title="Age"></vxe-table-column>
                </vxe-table>
              </template>
              <template v-else>
                <ul>
                  <li>
                    <span>ID：</span>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <span>Name：</span>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <span>UpdateTime：</span>
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
