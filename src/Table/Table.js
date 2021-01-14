const { LitElement, html, css } = require("lit-element");

class Table extends LitElement {
  static get styles() {
    return [
      css`
        @font-face {
          font-family: DriodRe;
          src: url(../../fonts/Droid.ttf);
        }
        th {
          font-family: DriodRe
        }
        #customers {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width:100%;
          
        }

        .tableContainer {
          box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
          border-radius:8px;
          padding:0px 15px
        }

        #customers td ,  #customers th{
          border-bottom:1px solid #ccc;
          padding: 8px;
        }

        #customers tr:nth-child(even) {
          /* background-color: #f2f2f2; */
        }

        #customers tr:hover {
          background-color: #ddd;
        }

        #customers th {
          padding-top: 12px;
          padding-bottom: 12px;
          text-align: left;
          background-color: transparent;
          color: black;
          outline:none
        }
        td{
          color:rgba(0,0,0,0.7)
        }

        .actions {
          color: #00f;
          text-decoration: underline;
          cursor: pointer;
        }
        .success {
          --mdc-theme-primary: #5cb85c;

          --mdc-theme-on-primary: white;
        }
        .info {
          --mdc-theme-primary: #5bc0de;
          --mdc-theme-on-primary: white;
        }
        .warning {
          --mdc-theme-primary: #f0ad4e;
          --mdc-theme-on-primary: white;
        }
        .danger {
          --mdc-theme-primary: #d9534f;
          --mdc-theme-on-primary: white;
        }
      `,
    ];
  }

  static get properties() {
    return {
      Heads: { type: Array },
      Rows: { type: Array },
      RequireData: { type: Array },
      Actions: { type: Array, values: [] },
      caption: { type: String },
    };
  }

  constructor() {
    super();
    this.Heads = [];
    this.RequireData = [];
    this.Actions = [];
    this.caption = "";
  }

  getHeads() {
    return this.Heads.map((item) => {
      if (item != "Actions" && item != "عملیات" && item != "کردارەکان")
        return html` <th>${item}</th> `;
      if (item === "Actions" || item === "عملیات" || item === "کردارەکان")
        return html`<th colspan="${this.Actions.length}">${item}</th> `;
    });
  }

  getRows() {
    return this.Rows.map((item) => {
      if (this.RequireData.length <= 0)
        return html`
          <tr>
            ${Object.keys(item).map((key) => html`<td>${item[key]}</td>`)}
            ${this.Actions.length > 0
              ? html`
                  <td>
                    ${this.Actions.map(
                      (el) =>
                        html`
                          <mwc-button
                            @click=${() => eval(el.action)(item[el.key])}
                            unelevated
                            class=${el.class}
                            label=${el.label}
                            icon=${el.icon}
                          ></mwc-button>
                        `
                    )}
                  </td>
                `
              : null}
          </tr>
        `;
      else
        return html`
          <tr>
            ${this.RequireData.map(
              (key) => html`<td>${this.checkPipe(item, key)}</td>`
            )}
            ${this.Actions.length > 0
              ? html`
                  <td>
                    ${this.Actions.map(
                      (el) =>
                       (el.icon!="" && el.icon!=undefined)? html`
                          <mwc-button
                            @click=${() => eval(el.action)(item[el.key])}
                            unelevated
                            class=${el.class}
                            label=${el.label}
                            icon=${el.icon}
                          ></mwc-button>
                        `: html`
                          <mwc-button
                            @click=${() => eval(el.action)(item[el.key])}
                            unelevated
                            class=${el.class}
                            label=${el.label}
                          ></mwc-button>`
                    )}
                  </td>
                `
              : null}
          </tr>
        `;
      d;
    });
  }

  checkPipe(data, key) {
    var pipe =
      key.split("|").length > 1
        ? key.split("|")[key.split("|").length - 1]
        : "";
    var value =
      key.split("|").length > 1
        ? this.checkforChild(data, key.split("|")[0])
        : this.checkforChild(data, key);
    if (pipe != "") {
      switch (pipe) {
        case "date":
          return ParseDateTime(value);
        case "money":
          return formatMoney(parseInt(value));
        case "weekday":
          return this.GetWeekday(value);
        default:
          return value;
      }
    } else {
      return value;
    }
  }

  GetWeekday(date) {
    return [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][new Date(date).getDay()];
  }

  checkforChild(data, value) {
    if (value != undefined) {
      var newArr = value.split(",");
      var newValue = null;
      if (newArr.length > 1) {
        newArr.forEach((element) => {
          newValue = newValue == null ? data[element] : newValue[element];
        });
        return newValue;
      } else {
        return data[value];
      }
    } else return data[value];
  }

  render() {
    return html`
      <div style="overflow:auto" class="tableContainer">
        <table id="customers">
          <caption>
            ${this.caption}
          </caption>
          <tr>
            ${this.getHeads()}
          </tr>
          ${this.getRows()}
        </table>
      </div>
      <slot name="pagination"></slot>
    `;
  }
}
customElements.define("table-view", Table);
