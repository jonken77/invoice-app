import React, { useState, useEffect, useRef } from 'react';
import logo from './assets/logo.svg';
import InvoiceTemplate from './components/InvoiceTemplate';
import DepositInvoiceTemplate from './components/DepositInvoiceTemplate';
import './App.css';

const clientsData = [
  { id: '', firstName: '', lastName: '', companyName: '', address: '', email: '' },
  { id: '0e9fdac4-069b-4da1-bcaf-d5228a55fbfa', firstName: 'Godfrey', lastName: 'Zvenyika', companyName: '', address: '24 Roy Campbell Street, Brackenhurst, Alberton, 1448, Johannesburg', email: 'ZvenyiG@eskom.co.za' },
  { id: '1', firstName: 'Art', lastName: 'Zimasa', companyName: 'Geoharmonize Engineering Consultants', address: '144 Begonia Road, Kyalami Ridge Ext. 6, Midrand, 1645, Johannesburg, South Africa', email: 'Geoharmonize@gmail.com' },
  { id: '10', firstName: 'Kholwani', lastName: 'Sibanda', companyName: 'KYN Priemer Design', address: 'No. 17 Stamperboom Street, Weltevreden Park, Roodepoort, 1709, Johannesburg', email: 'kholwani@kynpremierdesign.co.za' },
  { id: '11', firstName: 'MrsJ', lastName: '', companyName: '', address: 'Midrand, Johannesburg, South Africa', email: '' },
  { id: '12', firstName: 'Zidlaphi', lastName: 'Kgomo', companyName: 'ZIDLAPHI KGOMO & ASSOCIATES', address: '18 The Terrace, Corlett Gardens, 1 Rocky Place Street, Lyndhurst Johannesburg', email: 'unknown@unknown.co.za' },
  { id: '13', firstName: 'Kholwani', lastName: 'Sibanda', companyName: 'Plan Afrique', address: '10 Weiland Crescent, Bloubosrand, Randburg, Johannesburg', email: 'kholwani@planafrique.co.za' },
  { id: '2', firstName: 'Senzo', lastName: 'Tsotetsi', companyName: '', address: 'Unit 14, The View, 487 Boundary Road, Northriding, 2188, Johannesburg, South Africa', email: 'SenzoTsotetsi@yahoo.com' },
  { id: '3', firstName: 'Sifiso', lastName: 'Mgabi', companyName: 'SCM Engineering', address: '142/2281 Themeda Street, Savanna City, Randvaal, Johannesburg, 1984, South Africa', email: 'sifiso@scm-engineering.co.za' },
  { id: '4', firstName: 'Kreesen', lastName: 'Naidu', companyName: '', address: 'Unit 65, The View, 487 Boundary Road, Northriding, 2188, Johannesburg, South Africa', email: 'kreesen.kn@gmail.com' },
  { id: '5', firstName: 'Jeremiah', lastName: 'Ngwenya', companyName: 'Kuhle 777 (Pty) Ltd', address: 'Unit 57, 487 Boundary Road, Northriding, 2188, Johannesburg, South Africa', email: 'jngwe53@gmail.com' },
  { id: '54908365-7ae3-436b-8278-75cda143492a', firstName: 'Moses', lastName: 'Nonde', companyName: '', address: '9 Kingfisher Crescent, Meyersdal, Alberton, Johannesburg, 1448', email: '' },
  { id: '6', firstName: 'Arnold', lastName: 'Moyo', companyName: 'Mthabane Transport & Trading (Pty) Ltd', address: 'Middelburg Aerorand, 15 Visrivier Street, 1055, Middleburg, Mpumalanga', email: 'arnold@mthabanetransport.co.za' },
  { id: '7', firstName: 'Sizwe', lastName: 'Masenya', companyName: 'Conhill Dev. T/A Southern Hills Consulting Engineers', address: '21225 Lemur Street, Nietgedacht, Johannesburg, 1739', email: 'smasenya@conhilldev.co.za' },
  { id: '8', firstName: 'Joasiah', lastName: 'Gore', companyName: 'ShearForce Engineering Design & Construction', address: 'Unit 22 Hampstead Gardens, 79 Hyperion Drive, Northriding. Randburg, 2169, Johannesburg, South Africa', email: 'jgore@sfdc.co.za' },
  { id: '9', firstName: 'Richard', lastName: 'Kagaba', companyName: '', address: 'Unit 10, The View, 487 Boundary Road, Northriding, 2188, Johannesburg, South Africa', email: 'rkagaba@gmail.com' },
  { id: 'b3cb3954-e38d-46c9-9b37-b6a8c4f1e4b1', firstName: 'Ernest', lastName: 'Zvinavashe', companyName: '', address: '', email: '' },
  { id: 'b6797ade-7767-446c-97db-46f5affa7698', firstName: 'Kevin', lastName: 'Kudinha', companyName: '', address: '', email: 'kkudinha2000@yahoo.com' },
  { id: 'cdabd2f0-5fbe-4c81-bf0f-024220017eff', firstName: 'Lovemore', lastName: 'Pate', companyName: '', address: 'Portion 150 of 736 Welverdiend', email: '' },
  { id: 'f7174005-97f5-4044-bde2-cced13041011', firstName: 'Simon', lastName: 'Sandani', companyName: 'Uskabaherisa Projects', address: 'Innovation Worx, Halfway House, Midrand, Johannesburg', email: '' },
];

const parseAddress = (address) => {
  if (!address) return [];
  const parts = address.split(',').map(p => p.trim());
  const result = [];
  let i = 0;
  while (i < parts.length) {
    const part = parts[i];
    const postalCityMatch = part.match(/^(\d{4,})\s+(.+)$/);
    if (postalCityMatch) {
      result.push(`${postalCityMatch[1]} ${postalCityMatch[2]}`);
    } else {
      const bracketMatch = part.match(/^(\(\d{4},?\s*.+\))$/);
      if (bracketMatch) {
        result.push(bracketMatch[1]);
      } else {
        result.push(part);
      }
    }
    i++;
  }
  return result;
};

function App() {
  const today = new Date();
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;
  
  const generateInvoiceNumber = () => {
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `LP-WEL-${year}-${random}`;
  };

  const [invoiceType, setInvoiceType] = useState('invoice');
  const [selectedClient, setSelectedClient] = useState('');
  const [savedInvoices, setSavedInvoices] = useState(() => {
    const saved = localStorage.getItem('savedInvoices');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentInvoiceIndex, setCurrentInvoiceIndex] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: generateInvoiceNumber(),
    date: formattedDate,
    billTo: {
      name: '',
      address1: '',
      email: ''
    },
    contact: {
      name: 'MR. KENNEDY JOHN',
      address1: '1 MONTE VISTA, 21 Kleinste Street, Sunninghill, 2191',
      phone: '+27 067 310 5307',
      email: 'johnkennedybango@gmail.com'
    },
    items: [
      { description: '', quantity: 1, unitOfMeasure: '', unitPrice: 0, total: 0 }
    ],
    reference: '',
    bankDetails: {
      name: 'MR KENNEDY JOHN',
      bank: 'TYMEBANK',
      accountNo: '5104 7801 312',
      branchCode: '678 940',
      accountType: 'Current'
    }
  });

  const saveInvoice = () => {
    const newInvoice = {
      ...invoiceData,
      invoiceType,
      savedAt: new Date().toISOString()
    };
    
    let updated;
    if (currentInvoiceIndex !== null && currentInvoiceIndex >= 0) {
      updated = [...savedInvoices];
      updated[currentInvoiceIndex] = newInvoice;
    } else {
      updated = [newInvoice, ...savedInvoices];
      setCurrentInvoiceIndex(0);
    }
    
    setSavedInvoices(updated);
    localStorage.setItem('savedInvoices', JSON.stringify(updated));
    alert('Invoice saved!');
  };

  const loadInvoice = (invoice, index) => {
    setInvoiceData(invoice);
    setInvoiceType(invoice.invoiceType || 'invoice');
    setCurrentInvoiceIndex(index);
    setShowSavedInvoices(false);
  };

  const deleteInvoice = (index) => {
    const updated = savedInvoices.filter((_, i) => i !== index);
    setSavedInvoices(updated);
    localStorage.setItem('savedInvoices', JSON.stringify(updated));
  };

  const createNewInvoice = () => {
    const newInvoiceNum = generateInvoiceNumber();
    setInvoiceData({
      invoiceNumber: newInvoiceNum,
      date: formattedDate,
      billTo: { name: '', address1: '', email: '' },
      contact: {
        name: 'MR. KENNEDY JOHN',
        address1: '1 MONTE VISTA, 21 Kleinste Street, Sunninghill, 2191',
        phone: '+27 067 310 5307',
        email: 'johnkennedybango@gmail.com'
      },
      items: [{ description: '', quantity: 1, unitOfMeasure: '', unitPrice: 0, total: 0 }],
      reference: newInvoiceNum,
      bankDetails: {
        name: 'MR KENNEDY JOHN',
        bank: 'TYMEBANK',
        accountNo: '5104 7801 312',
        branchCode: '678 940',
        accountType: 'Current'
      }
    });
    setSelectedClient('');
    setInvoiceType('invoice');
    setCurrentInvoiceIndex(null);
  };

  const handleClientChange = (clientId) => {
    setSelectedClient(clientId);
    if (!clientId) return;
    
    const client = clientsData.find(c => c.id === clientId);
    if (client) {
      const fullName = [client.firstName, client.lastName].filter(Boolean).join(' ');
      const prefix = client.companyName ? '' : 'MR. ';
      setInvoiceData(prev => ({
        ...prev,
        billTo: {
          name: prefix + fullName.toUpperCase(),
          address1: client.address,
          email: client.email
        }
      }));
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section) {
      setInvoiceData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      if (field === 'invoiceNumber') {
        setInvoiceData(prev => ({ ...prev, invoiceNumber: value, reference: value }));
      } else {
        setInvoiceData(prev => ({ ...prev, [field]: value }));
      }
    }
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitOfMeasure: '', unitPrice: 0, total: 0 }]
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }
    setInvoiceData(prev => ({ ...prev, items: newItems }));
  };

  const removeItem = (index) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotal = () => invoiceData.items.reduce((sum, item) => sum + item.total, 0);

  const formatNumber = (num) => {
    const isNegative = num < 0;
    const formatted = Math.abs(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return { value: formatted, isNegative };
  };

  const renderFormattedNumber = (num, prefix = 'R') => {
    const { value, isNegative } = formatNumber(num);
    const sign = isNegative ? '-' : '';
    return <span className={isNegative ? 'negative-amount' : ''}>{sign}{prefix}{value}</span>;
  };

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const FormSection = ({ title, sectionKey, children }) => {
    const isCollapsed = collapsedSections[sectionKey];
    return (
      <div className="form-section">
        <h3 onClick={() => toggleSection(sectionKey)}>
          {title}
          <span>{isCollapsed ? '▶' : '▼'}</span>
        </h3>
        {!isCollapsed && children}
      </div>
    );
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Invoice Settings</h2>
        
        <div className="form-group">
          <label>Invoice Type</label>
          <select value={invoiceType} onChange={(e) => setInvoiceType(e.target.value)}>
            <option value="deposit">Deposit Invoice</option>
            <option value="invoice">Invoice</option>
          </select>
        </div>

        <FormSection title="Invoice Details" sectionKey="details">
          <div className="form-group">
            <label>Invoice Number</label>
            <input type="text" value={invoiceData.invoiceNumber} onChange={(e) => handleInputChange(null, 'invoiceNumber', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="text" value={invoiceData.date} onChange={(e) => handleInputChange(null, 'date', e.target.value)} />
          </div>
        </FormSection>

        <div className="form-section" style={{marginTop: '8px'}}>
          <button className="save-btn" onClick={saveInvoice}>
            {currentInvoiceIndex !== null ? 'Update Invoice' : 'Save Invoice'}
          </button>
          <button className="new-btn" onClick={createNewInvoice}>+ New Invoice</button>
        </div>

        <FormSection title="Saved Invoices" sectionKey="saved">
          {savedInvoices.length === 0 ? (
            <p className="no-invoices">No saved invoices</p>
          ) : (
            savedInvoices.map((inv, index) => (
              <div key={index} className="saved-invoice-item">
                <div className="saved-invoice-info" onClick={() => loadInvoice(inv, index)}>
                  <div className="saved-invoice-number">{inv.invoiceNumber}</div>
                  <div className="saved-invoice-meta">
                    {inv.billTo.name || 'No client'} - {inv.date}
                  </div>
                </div>
                <button className="delete-invoice-btn" onClick={() => deleteInvoice(index)}>×</button>
              </div>
            ))
          )}
        </FormSection>

        <FormSection title="Bill To" sectionKey="billTo">
          <div className="form-group">
            <label>Select Client</label>
            <select value={selectedClient} onChange={(e) => handleClientChange(e.target.value)}>
              <option value="">-- Select Client --</option>
              {clientsData.filter(c => c.id).map(client => (
                <option key={client.id} value={client.id}>
                  {client.companyName || [client.firstName, client.lastName].filter(Boolean).join(' ')}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={invoiceData.billTo.name} onChange={(e) => handleInputChange('billTo', 'name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value={invoiceData.billTo.address1} onChange={(e) => handleInputChange('billTo', 'address1', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={invoiceData.billTo.email} onChange={(e) => handleInputChange('billTo', 'email', e.target.value)} />
          </div>
        </FormSection>

        <FormSection title="Contact" sectionKey="contact">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={invoiceData.contact.name} onChange={(e) => handleInputChange('contact', 'name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value={invoiceData.contact.address1} onChange={(e) => handleInputChange('contact', 'address1', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="text" value={invoiceData.contact.phone} onChange={(e) => handleInputChange('contact', 'phone', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={invoiceData.contact.email} onChange={(e) => handleInputChange('contact', 'email', e.target.value)} />
          </div>
        </FormSection>

        <FormSection title="Items" sectionKey="items">
          {invoiceData.items.map((item, index) => (
            <div key={index} className="item-row">
              <div className="form-group">
                <label>Description</label>
                <input type="text" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} />
              </div>
              <div className="form-group-inline">
                <div className="form-group">
                  <label>Qty</label>
                  <input type="number" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)} />
                </div>
                <div className="form-group">
                  <label>Unit</label>
                  <input type="text" value={item.unitOfMeasure} onChange={(e) => updateItem(index, 'unitOfMeasure', e.target.value)} placeholder="e.g. days, hrs" />
                </div>
              </div>
              <div className="form-group">
                <label>Unit Price</label>
                <input type="number" value={item.unitPrice} onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="form-group">
                <label>Total</label>
                <input type="text" value={item.total.toFixed(2)} readOnly />
              </div>
              <button type="button" className="remove-btn" onClick={() => removeItem(index)}>×</button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={addItem}>+ Add Item</button>
        </FormSection>

        <FormSection title="Bank Details" sectionKey="bankDetails">
          <div className="form-group">
            <label>Account Name</label>
            <input type="text" value={invoiceData.bankDetails.name} onChange={(e) => handleInputChange('bankDetails', 'name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Bank</label>
            <input type="text" value={invoiceData.bankDetails.bank} onChange={(e) => handleInputChange('bankDetails', 'bank', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Account Number</label>
            <input type="text" value={invoiceData.bankDetails.accountNo} onChange={(e) => handleInputChange('bankDetails', 'accountNo', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Branch Code</label>
            <input type="text" value={invoiceData.bankDetails.branchCode} onChange={(e) => handleInputChange('bankDetails', 'branchCode', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Account Type</label>
            <input type="text" value={invoiceData.bankDetails.accountType} onChange={(e) => handleInputChange('bankDetails', 'accountType', e.target.value)} />
          </div>
        </FormSection>
      </aside>

      <main className="main-content">
        <div className="page">
          <header className="main_container">
            <div className="invoice">
              {invoiceType === 'deposit' ? (
                <>
                  <div className="deposit">DEPOSIT</div>
                  <div className="invoice-text">INVOICE</div>
                </>
              ) : (
                <div className="invoice-text">INVOICE</div>
              )}
            </div>
            <img src={logo} alt="logo" className="logo" />
          </header>

          <div className="numberdate">
            <div>{invoiceType === 'deposit' ? 'DEPOSIT ' : ''}INVOICE No. <span>{invoiceData.invoiceNumber}</span></div>
            <div>DATE: {invoiceData.date}</div>
          </div>

          <div className="addresses">
            <div className="billto">
              <ul>
                <li className="bill">BILL TO</li>
                <li>{invoiceData.billTo.name}</li>
                {parseAddress(invoiceData.billTo.address1).length > 0 
                  ? parseAddress(invoiceData.billTo.address1).map((part, i) => <li key={i}>{part}</li>)
                  : <><li></li><li></li><li></li><li></li><li></li></>
                }
                <li className="email">{invoiceData.billTo.email}</li>
              </ul>
            </div>

            <div className="contact">
              <ul>
                <li className="bill">CONTACT</li>
                <li>{invoiceData.contact.name}</li>
                {parseAddress(invoiceData.contact.address1).map((part, i) => <li key={i}>{part}</li>)}
                <li>{invoiceData.contact.phone}</li>
                <li className="email">{invoiceData.contact.email}</li>
              </ul>
            </div>
          </div>

          <div className="maintable">
            <table>
              <thead>
                <tr>
                  <th className="item">item</th>
                  <th className="description">DESCRIPTION</th>
                  <th className="quantity">QTY</th>
                  <th className="unit">UNIT PRICE, R</th>
                  <th className="total">TOTAL, R</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td className="description01">{item.description}</td>
                    <td>{item.quantity}{item.unitOfMeasure ? ` ${item.unitOfMeasure}` : ''}</td>
                    <td>{renderFormattedNumber(item.unitPrice)}</td>
                    <td>{renderFormattedNumber(item.total)}</td>
                  </tr>
                ))}
                {[...Array(Math.max(0, 5 - invoiceData.items.length))].map((_, i) => (
                  <tr key={`empty-${i}`}>
                    <td></td>
                    <td className="description01"></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                ))}
                <tr>
                  <td className="description02"></td>
                  <td className="description02"></td>
                  <td className="description02"></td>
                  <td className="description02">TOTAL</td>
                  <td className="description02">{renderFormattedNumber(calculateTotal())}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="reference">
            Thank you for your kind support. Please use Invoice No. <strong>{invoiceData.invoiceNumber}</strong> as Reference.
          </div>

          <footer>
            <div></div>
            <div className="pay">
              <div>PAYMENT</div>
              <div>DETAILS</div>
            </div>
            <div className="contact">
              <ul className="contact02">
                <li className="contact01">{invoiceData.bankDetails.name}</li>
                <li className="contact01">{invoiceData.bankDetails.bank}</li>
                <li className="contact01">ACCOUNT No. {invoiceData.bankDetails.accountNo}</li>
                <li className="contact01">BRANCH CODE: {invoiceData.bankDetails.branchCode}</li>
                <li className="contact01">ACCOUNT TYPE: {invoiceData.bankDetails.accountType}</li>
              </ul>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
