import i18n from 'i18n';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { descendantFileTotalsShape } from './helpers';

/**
 * Choose which message to delete confirmation message to display.
 * @param {object} folderDescendantFileTotals
 * @param {object} fileTotalItems
 * @returns {string}
 */
const confirmationMessage = (folderDescendantFileTotals, fileTotalItems) => i18n.sprintf(
    i18n._t(
      'AssetAdmin.BULK_ACTIONS_DELETE_ITEMS_CONFIRM',
      [
        "Warning: You're about to delete %s file(s) which may be used in your site's content.",
        'Please carefully check the file usage to ensure they are removed from the content areas',
        'prior to deleting them, otherwise they will appear as broken links.'
      ].join(' ')
    ),
    folderDescendantFileTotals.totalCount + fileTotalItems
  );

/**
 * Display a context dependent confirmation message.
 */
const BulkDeleteMessage = ({ folderDescendantFileTotals, fileTotalItems }) => (
  <Fragment>
    <p>{confirmationMessage(folderDescendantFileTotals, fileTotalItems)}</p>
  </Fragment>
);

BulkDeleteMessage.propTypes = {
  folderDescendantFileTotals: descendantFileTotalsShape,
  fileTotalItems: PropTypes.number,
};

BulkDeleteMessage.defaultProps = {
  folderDescendantFileTotals: { totalItems: 0, totalCount: 0 },
  fileTotalItems: 0
};

export default BulkDeleteMessage;
