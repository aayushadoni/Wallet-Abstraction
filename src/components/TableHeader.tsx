import React from 'react';

const styles = {
  textIcon: `flex items-center`
};

const TableHeader = () => {
  return (
    <thead className="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider">
      <tr>
        <th className="py-3 px-4">#</th>
        <th className="py-3 px-4">Name</th>
        <th className="py-3 px-4">Price</th>
        <th className="py-3 px-4">24h %</th>
        <th className="py-3 px-4">7d %</th>
        <th className="py-3 px-4">
          <div className={styles.textIcon}>
            <p className="mr-2">Market Cap</p>
          </div>
        </th>
        <th className="py-3 px-4">
          <div className={styles.textIcon}>
            <p className="mr-2">Volume (24h)</p>
          </div>
        </th>
        <th className="py-3 px-4">
          <div className={styles.textIcon}>
            <p className="mr-2">Last 7 Days</p>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
