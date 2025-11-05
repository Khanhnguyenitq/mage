<?php
namespace Nguyen\Student\Ui\DataProvider;

use Magento\Ui\DataProvider\AbstractDataProvider;
use Magento\Framework\Data\Collection\EntityFactoryInterface;
use Magento\Framework\DataObject;

class StudentGridDataProvider extends AbstractDataProvider
{
    protected $entityFactory;

    public function __construct(
        $name,
        $primaryFieldName,
        $requestFieldName,
        EntityFactoryInterface $entityFactory,
        array $meta = [],
        array $data = []
    ) {
        $this->entityFactory = $entityFactory;
        $this->collection = new \Magento\Framework\Data\Collection($entityFactory);
        parent::__construct($name, $primaryFieldName, $requestFieldName, $meta, $data);
    }

    public function getData()
    {
        $items = [];

        // Dữ liệu mẫu - bạn có thể thay bằng DB
        $rawData = [
            ['type' => 'A', 'all_data' => 'A1', 'w1' => 10, 'w2' => 20, 'w5' => 50],
            ['type' => 'A', 'all_data' => 'B1', 'w1' => 15, 'w3' => 30],
            ['type' => 'B', 'all_data' => 'B2', 'w2' => 25, 'w4' => 40],
            ['type' => 'B', 'all_data' => 'B3', 'w1' => 12, 'w5' => 60],
            ['type' => 'C', 'all_data' => 'C1', 'w3' => 35],
            ['type' => 'C', 'all_data' => 'C2', 'w1' => 18, 'w2' => 22, 'w5' => 55],
        ];

        $groupAdded = [];

        foreach ($rawData as $index => $row) {
            $type = $row['type'];

            // Thêm nhóm (chỉ 1 lần)
            if (!isset($groupAdded[$type])) {
                $groupRow = new DataObject([
                    'entity_id' => 'group_' . $type,
                    '_is_group' => true,
                    'type' => $type,
                    'all_data' => '',
                    'w1' => '', 'w2' => '', 'w3' => '', 'w4' => '', 'w5' => ''
                ]);
                $items[] = $groupRow;
                $groupAdded[$type] = true;
            }

            // Thêm hàng con
            $childRow = new DataObject($row);
            $childRow->setData([
                'entity_id' => 'child_' . $index,
                '_is_child' => true,
                'type' => '' // Ẩn type ở hàng con
            ]);
            $items[] = $childRow;
        }

        return [
            'totalRecords' => count($items),
            'items' => $items
        ];
    }
}