<template>
  <div>
    <p class="tip">
      表尾合并列，通过 <table-api-link prop="footer-span-method"/> 方法<br>
      <span class="red">（注：<table-api-link prop="footer-method"/> 合计的逻辑都是自行实现的，该示例仅供参考）</span>
    </p>

    <vxe-table
      border
      show-footer
      height="400"
      :span-method="colspanMethod"
      :footer-span-method="footerColspanMethod"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" footer-align="center"></vxe-table-column>
      <vxe-table-column field="age" title="Age" footer-align="center"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">合并行</p>

    <vxe-table
      border
      show-footer
      height="400"
      :span-method="rowspanMethod"
      :footer-span-method="footerRowspanMethod"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="key" title="Key"></vxe-table-column>
      <vxe-table-column field="content" title="Translate"></vxe-table-column>
      <vxe-table-column field="language" title="Language" :filters="[{label: '中文', value: 'zh_CN'}, {label: 'English', value: 'en_US'}]"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
          show-footer
          height="400"
          :span-method="colspanMethod"
          :footer-span-method="footerColspanMethod"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" footer-align="center"></vxe-table-column>
          <vxe-table-column field="age" title="Age" footer-align="center"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  // 合并为一列显示
                  if (['age', 'rate'].includes(column.property)) {
                    return this.$utils.mean(data, 'age')
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  // 合并为一列显示
                  if (['age', 'rate'].includes(column.property)) {
                    return this.$utils.sum(data, 'age')
                  }
                  return null
                })
              ]
              return footerData
            },
            colspanMethod ({ row, rowIndex, column, columnIndex, data }) {
              if (rowIndex % 2 === 0) {
                if (columnIndex === 2) {
                  return {
                    rowspan: 1,
                    colspan: 2
                  }
                } else if (columnIndex === 3) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            },
            footerColspanMethod ({ column, columnIndex, data }) {
              if (columnIndex === 3) {
                return {
                  rowspan: 1,
                  colspan: 2
                }
              } else if (columnIndex === 4) {
                return {
                  rowspan: 0,
                  colspan: 0
                }
              }
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-footer
          height="400"
          :span-method="rowspanMethod"
          :footer-span-method="footerRowspanMethod"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="key" title="Key"></vxe-table-column>
          <vxe-table-column field="content" title="Translate"></vxe-table-column>
          <vxe-table-column field="language" title="Language" :filters="[{label: '中文', value: 'zh_CN'}, {label: 'English', value: 'en_US'}]"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['content'].includes(column.property)) {
                    return '合并为一行显示'
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['content'].includes(column.property)) {
                    return '合并为一行显示'
                  }
                  return null
                })
              ]
              return footerData
            },
            // 通用行合并函数（将相同多列数据合并为一行）
            rowspanMethod ({ row, $rowIndex, column, data }) {
              let fields = ['key']
              let cellValue = row[column.property]
              if (cellValue && fields.includes(column.property)) {
                let prevRow = data[$rowIndex - 1]
                let nextRow = data[$rowIndex + 1]
                if (prevRow && prevRow[column.property] === cellValue) {
                  return { rowspan: 0, colspan: 0 }
                } else {
                  let countRowspan = 1
                  while (nextRow && nextRow[column.property] === cellValue) {
                    nextRow = data[++countRowspan + $rowIndex]
                  }
                  if (countRowspan > 1) {
                    return { rowspan: countRowspan, colspan: 1 }
                  }
                }
              }
            },
            footerRowspanMethod ({ $rowIndex, column, columnIndex, data }) {
              if ($rowIndex === 0) {
                if (columnIndex === 2) {
                  return { rowspan: 2, colspan: 1 }
                }
              } else if ($rowIndex === 1) {
                if (columnIndex === 2) {
                  return { rowspan: 0, colspan: 0 }
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
    let list = window.MOCK_DATA_LIST.slice(0, 20)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    footerMethod ({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          // 合并为一列显示
          if (['age', 'rate'].includes(column.property)) {
            return this.$utils.mean(data, 'age')
          }
          if (['content'].includes(column.property)) {
            return '合并为一行显示'
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          // 合并为一列显示
          if (['age', 'rate'].includes(column.property)) {
            return this.$utils.sum(data, 'age')
          }
          if (['content'].includes(column.property)) {
            return '合并为一行显示'
          }
          return null
        })
      ]
      return footerData
    },
    colspanMethod ({ row, rowIndex, column, columnIndex, data }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 2) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if (columnIndex === 3) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    footerColspanMethod ({ column, columnIndex, data }) {
      if (columnIndex === 3) {
        return {
          rowspan: 1,
          colspan: 2
        }
      } else if (columnIndex === 4) {
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    rowspanMethod ({ row, $rowIndex, column, data }) {
      let fields = ['key']
      let cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        let prevRow = data[$rowIndex - 1]
        let nextRow = data[$rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = data[++countRowspan + $rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    footerRowspanMethod ({ $rowIndex, column, columnIndex, data }) {
      if ($rowIndex === 0) {
        if (columnIndex === 2) {
          return { rowspan: 2, colspan: 1 }
        }
      } else if ($rowIndex === 1) {
        if (columnIndex === 2) {
          return { rowspan: 0, colspan: 0 }
        }
      }
    }
  }
}
</script>
