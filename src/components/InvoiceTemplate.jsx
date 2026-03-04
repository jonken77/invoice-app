import React from 'react';

const InvoiceTemplate = ({ data }) => {
  const {
    invoiceNumber = '',
    date = '',
    billTo = { name: '', address1: '', email: '' },
    contact = { name: '', address1: '', phone: '', email: '' },
    items = [],
    bankDetails = { name: '', bank: '', accountNo: '', branchCode: '', accountType: '' }
  } = data || {};

  const calculateTotal = () => items.reduce((sum, item) => sum + (item.total || 0), 0);

  const formatNumber = (num) => {
    const val = (num || 0).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return val;
  };

  const parseAddress = (address) => {
    if (!address) return [];
    return address.split(',').map(p => p.trim());
  };

  return (
    <svg
      width="210mm"
      height="297mm"
      viewBox="0 0 793.70081 1122.5197"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <rect id="rect4" x="131.86225" y="382.06242" width="232.16772" height="74.383833" />
        <rect id="rect5" x="161.77659" y="313.99003" width="312.39617" height="172.93359" />
      </defs>

      <g id="layer1">
        <rect
          id="rect3"
          x="0"
          y="0"
          width="793.70081"
          height="199.23225"
          fill="#dbe3de"
        />

        <g id="g1" transform="matrix(0.30060853,0,0,0.30060853,517.49037,24.025575)">
          <path
            fillRule="evenodd"
            fill="#000000"
            stroke="#555555"
            d="m 238.94569,176.94824 v 0 0 l 0.10204,0.44026 v 1e-5 0 0 l 0.28347,0.38173 v 0 0 1e-5 0 l 0.0113,0.008 3e-5,10e-6 v 2e-5 1e-5 l 4e-5,2e-5 v 1e-5 2e-5 2e-5 l 4e-5,2e-5 v 2e-5 2e-5 l -0.003,1.92468 v 0 l 0.034,2.08932 v 2e-5 2e-5 2e-5 l -4e-5,2e-5 v 2e-5 2e-5 l -0.20938,0.30081 v 1e-5 0 0 l -0.0869,0.44197 v 0 0 0 0 l 0.11527,0.43857 v 0 1e-5 0 l 0.20372,0.26169 v 1e-5 2e-5 2e-5 l 4e-5,1e-5 v 2e-5 2e-5 2e-5 l 0.0521,3.27668 v 0 l 0.034,1.01967 v 2e-5 2e-5 2e-5 2e-5 2e-5 2e-5 l -0.0964,0.14649 v 10e-6 0 0 0 0 l -0.0729,0.44365 v 1e-5 0 10e-6 0 l 0.13039,0.43685 v 1e-5 0 0 l 0.0764,0.0922 3e-5,1e-5 v 2e-5 2e-5 2e-5 2e-5 1e-5 2e-5 l 0.0522,1.55662 v 1e-5 l 0.18255,3.12221 v 0 l 0.20372,2.28309 v 0 l 0.45619,3.60784 v 2e-5 3e-5 l -0.008,0.0749 v 0 1e-5 0 0 l 0.0265,0.0702 3e-5,3e-5 v 2e-5 l 0.0892,0.70548 v 0 l 0.74699,4.34424 v 0 l 3e-5,2e-5 -3e-5,2e-5 v 2e-5 2e-5 2e-5 2e-5 l -0.0113,0.0181 v 0 0 0 0 0 l -0.0302,0.44868 v 0 2e-5 0 0 0 l 0.17008,0.43179 v 0 h 4e-5 l 0.0302,0.0306 v 2e-5 h 4e-5 v 2e-5 2e-5 2e-5 2e-5 l 0.22791,1.32447 v 0 2e-5 l 0.67638,3.08386 v 3e-5 2e-5 1e-5 3e-5 2e-5 2e-5 l -0.10318,0.26555 v 2e-5 0 0 0 0 l -0.0151,0.45051 v 0 0 0 0 0 l 0.18482,0.42996 v 2e-5 0 0 l 0.23698,0.23826 v 0 l 4e-5,3e-5 v 1e-5 3e-5 2e-5 l 3e-5,2e-5 0.43495,1.98314 v 0 l 0.51251,1.90399 v 2e-5 2e-5 2e-5 2e-5 2e-5 2e-5 2e-5 l -0.22904,0.57911 v 0 0 2e-5 l -0.002,0.45214 h 4e-5 v 0 0 l 0.1954,0.42833 v 0 0 0 0 0 3e-5 l 0.35792,0.34854 v 0 0 l 0.19049,0.0997 v 0 l 4e-5,2e-5 v 2e-5 h 3e-5 v 2e-5 2e-5 2e-5 l 4e-5,2e-5 0.66293,2.46279 v 0 3e-5 l 0.11074,0.34348 4e-5,2e-5 v 2e-5 0 l 0.0302,0.76042 v 10e-6 2e-5 3e-5 l -0.20182,0.69041 h -4e-5 v 0 l 0.0113,0.45377 v 0 2e-5 0 0 l 0.20976,0.4267 v 0 0 0 0 l 0.13493,0.12616 v 3e-5 l 4e-5,2e-5 v 2e-5 0 2e-5 2e-5 l 4e-5,2e-5 0.10091,0.78931 v 0 l 0.38835,1.73408 v 2e-5 l 0.72487,2.25695 v 2e-5 2e-5 l 0.0189,0.25436 v 0 0 0 0 0 l 0.15345,0.27919 v 0 3e-5 l 0.24718,0.76938 v 0 0 l 1.31025,3.47527 v 4e-5 4e-5 0 4e-5 l 0.008,0.60574"
          />
        </g>

        <text
          x="131.86133"
          y="420.38048"
          fontFamily="Geist, Arial, sans-serif"
          fontSize="42.6667"
          fill="#000000"
          letterSpacing="5"
        >
          INVOICE
        </text>

        <rect
          x="95.954819"
          y="399.01047"
          width="348.4025"
          height="392.82919"
          fill="none"
          stroke="#000000"
          strokeWidth="1.39902"
        />

        <g id="strips">
          {[422.93515, 445.98923, 469.04343, 492.0975, 515.15167, 538.20587, 561.25983, 584.3139, 607.36798, 630.42218, 653.47626, 676.53033, 699.58453, 722.63873, 745.69269, 768.74677].map((y, i) => (
            <rect
              key={i}
              x="42.931568"
              y={y}
              width="707.83765"
              height="23.054138"
              fill={i % 2 === 0 ? '#f2f2f2' : '#e6e6e6'}
            />
          ))}
        </g>

        <rect
          x="42.475773"
          y="399.56952"
          width="707.83765"
          height="23.054138"
          fill="#dbe3de"
          stroke="#000000"
          strokeWidth="0.860044"
        />

        <rect
          x="444.35733"
          y="399.05804"
          width="67.64183"
          height="392.71042"
          fill="none"
          stroke="#000000"
          strokeWidth="1.10038"
        />

        <rect
          x="511.82251"
          y="399.17554"
          width="99.682465"
          height="392.47537"
          fill="none"
          stroke="#000000"
          strokeWidth="1.33541"
        />

        <rect
          x="611.46118"
          y="399.31836"
          width="138.86562"
          height="415.15619"
          fill="none"
          stroke="#000000"
          strokeWidth="1.62106"
        />

        <rect
          x="610.87732"
          y="791.5976"
          width="139.63988"
          height="32.477016"
          fill="#dbe3de"
          stroke="#000000"
          strokeWidth="1.33417"
        />

        <text
          x="680.69726"
          y="812.33597"
          fontFamily="Geist, Arial, sans-serif"
          fontSize="14"
          fill="#000000"
          textAnchor="middle"
        >
          {formatNumber(calculateTotal())}
        </text>
      </g>
    </svg>
  );
};

export default InvoiceTemplate;
