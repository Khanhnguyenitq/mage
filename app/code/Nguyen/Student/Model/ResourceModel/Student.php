<?php
namespace Nguyen\Student\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

class Student extends AbstractDb
{
    protected function _construct()
    {
        $this->_init('nguyen_student', 'student_id');
    }
}