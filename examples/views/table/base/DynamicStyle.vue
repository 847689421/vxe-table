<template>
  <div>
    <p class="tip">
      行的动态样色、单元格动态样式，表头的动态样式、表尾的动态样式、全部都可以完全自定义<br>
      <span class="red">（注：当自定义样式之后可能会覆盖表格的样式，比如选中行..等，记得自行处理好相关样式）</span>
    </p>

    <vxe-table
      border
      :header-cell-style="headerCellStyle"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="scss">{{ demoCodes[2] }}</code>
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
          border
          :header-cell-style="headerCellStyle"
          :row-style="rowStyle"
          :cell-style="cellStyle"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            headerCellStyle ({ column, columnIndex }) {
              if (column.property === 'name') {
                return {
                  backgroundColor: '#f60',
                  color: '#ffffff'
                }
              }
            },
            rowStyle ({ row, rowIndex }) {
              if ([2, 3, 5].includes(rowIndex)) {
                return {
                  backgroundColor: 'red',
                  color: '#ffffff'
                }
              }
            },
            cellStyle ({ row, rowIndex, column, columnIndex }) {
              if (column.property === 'sex') {
                if (row.sex >= '1') {
                  return {
                    backgroundColor: '#187'
                  }
                } else if (row.age === 26) {
                  return {
                    backgroundColor: '#2db7f5'
                  }
                }
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    headerCellStyle ({ column, columnIndex }) {
      if (column.property === 'name') {
        return {
          backgroundColor: '#f60',
          color: '#ffffff'
        }
      }
    },
    rowStyle ({ row, rowIndex }) {
      if ([2, 3, 5].includes(rowIndex)) {
        return {
          backgroundColor: 'red',
          color: '#ffffff'
        }
      }
    },
    cellStyle ({ row, rowIndex, column, columnIndex }) {
      if (column.property === 'sex') {
        if (row.sex >= '1') {
          return {
            backgroundColor: '#187'
          }
        } else if (row.age === 26) {
          return {
            backgroundColor: '#2db7f5'
          }
        }
      }
    }
  }
}
</script>
