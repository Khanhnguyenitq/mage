<?php
namespace Nguyen\Student\Model\ResourceModel\Student;

use Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection;

class Collection extends AbstractCollection
{
    protected $_idFieldName = 'student_id';

    protected function _construct()
    {
        $this->_init(
            \Nguyen\Student\Model\Student::class,
            \Nguyen\Student\Model\ResourceModel\Student::class
        );
    }
}
