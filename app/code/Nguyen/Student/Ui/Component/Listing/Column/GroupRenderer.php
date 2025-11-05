<?php
namespace Nguyen\Student\Ui\Component\Listing\Column;

use Magento\Framework\View\Element\UiComponent\ContextInterface;
use Magento\Framework\View\Element\UiComponentFactory;
use Magento\Ui\Component\Listing\Columns\Column;

class GroupRenderer extends Column
{
    public function prepareDataSource(array &$dataSource)
    {
        if (isset($dataSource['data']['items'])) {
            foreach ($dataSource['data']['items'] as &$item) {
                if (isset($item['_is_group']) && $item['_is_group']) {
                    $item[$this->getData('name')] = '<strong>' . htmlspecialchars($item['type']) . '</strong>';
                } elseif (isset($item['_is_child']) && $item['_is_child']) {
                    $item[$this->getData('name')] = '<span style="padding-left: 20px;"></span>';
                }
            }
        }

        return $dataSource;
    }
}