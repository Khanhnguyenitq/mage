<?php

namespace Nguyen\Student\Block\Adminhtml;

use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Framework\App\ResourceConnection;

class StudentMatrix extends Template
{
    protected $connection;

    public function __construct(
        Context $context,
        ResourceConnection $resource,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->connection = $resource->getConnection();
    }

    public function getStudentData()
    {
        $table = $this->connection->getTableName('nguyen_student');
        return $this->connection->fetchAll("SELECT * FROM {$table}");
    }
}
